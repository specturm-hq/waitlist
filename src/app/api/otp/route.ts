import { NextResponse } from 'next/server';
import otpGenerator from 'otp-generator';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import { sendOTPEmail, sendWelcomeEmail } from '@/lib/email';
import { validateEmail, validateName, validateOTP, sanitizeInput, isDisposableEmail } from '@/lib/validation';
import { checkRateLimit, checkResendCooldown, resetRateLimit } from '@/lib/rateLimit';

// In-memory store for OTPs with hashing
interface OTPRecord {
    hashedOTP: string;
    expiresAt: number;
    name: string;
}

const otpStore = new Map<string, OTPRecord>();

// Cleanup expired OTPs every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [email, record] of otpStore.entries()) {
        if (now > record.expiresAt) {
            otpStore.delete(email);
        }
    }
}, 5 * 60 * 1000);

// Save verified user to MongoDB
const saveUserToDb = async (name: string, email: string) => {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('waitlist');

        // Check duplicate
        const existing = await collection.findOne({ email });
        if (existing) {
            return;
        }

        await collection.insertOne({
            name,
            email,
            verifiedAt: new Date().toISOString(),
            source: 'waitlist'
        });
    } catch (error) {
        console.error("[DB ERROR]", error);
        // Fallback: try Excel (for local dev without MongoDB)
        try {
            await saveUserToExcelFallback(name, email);
        } catch (e) {
            console.error("[FALLBACK ERROR]", e);
        }
    }
};

// Excel fallback for local dev
const saveUserToExcelFallback = async (name: string, email: string) => {
    try {
        const XLSX = await import('xlsx');
        const path = await import('path');
        const fs = await import('fs');

        const filePath = path.join(process.cwd(), 'users.xlsx');
        let workbook;
        let users: any[] = [];

        if (fs.existsSync(filePath)) {
            workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            users = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        } else {
            workbook = XLSX.utils.book_new();
        }

        if (users.some((u: any) => u.Email === email)) return;

        users.push({ Name: name, Email: email, VerifiedAt: new Date().toISOString() });
        const newWorksheet = XLSX.utils.json_to_sheet(users);

        if (!workbook.SheetNames.length) {
            XLSX.utils.book_append_sheet(workbook, newWorksheet, 'Users');
        } else {
            workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;
        }
        XLSX.writeFile(workbook, filePath);
    } catch (e) {
        // Not in a writable environment
    }
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type, email: rawEmail, name: rawName, otp: rawOtp } = body;

        // Sanitize inputs
        const email = sanitizeInput(rawEmail || '').toLowerCase();
        const name = sanitizeInput(rawName || '');
        const otp = sanitizeInput(rawOtp || '');

        // ===== SEND OTP =====
        if (type === 'send-otp') {
            // Validation
            if (!validateEmail(email)) {
                return NextResponse.json({ success: false, message: 'Invalid email format' }, { status: 400 });
            }

            if (!validateName(name)) {
                return NextResponse.json({ success: false, message: 'Name must be 2-50 characters, letters only' }, { status: 400 });
            }

            if (isDisposableEmail(email)) {
                return NextResponse.json({ success: false, message: 'Disposable emails are not allowed' }, { status: 400 });
            }

            // Rate limiting: 3 OTP requests per 10 minutes per email
            const rateLimitResult = checkRateLimit(`otp-send:${email}`, 3, 10 * 60 * 1000);
            if (!rateLimitResult.success) {
                const minutesRemaining = Math.ceil((rateLimitResult.resetAt - Date.now()) / 60000);
                return NextResponse.json({
                    success: false,
                    message: `Too many requests. Please try again in ${minutesRemaining} minute${minutesRemaining > 1 ? 's' : ''}.`,
                    resetAt: rateLimitResult.resetAt
                }, { status: 429 });
            }

            // Generate OTP
            const generatedOtp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false
            });

            // Hash OTP before storing
            const hashedOTP = await bcrypt.hash(generatedOtp, 10);
            const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

            otpStore.set(email, { hashedOTP, expiresAt, name });

            // Send email via Gmail SMTP
            const emailSent = await sendOTPEmail(email, generatedOtp, name);
            if (!emailSent) {
                return NextResponse.json({
                    success: false,
                    message: 'Failed to send email. Please try again.'
                }, { status: 500 });
            }

            return NextResponse.json({
                success: true,
                message: 'Verification code sent! Check your email.',
                expiresIn: 300,
            });
        }

        // ===== VERIFY OTP =====
        else if (type === 'verify-otp') {
            // Validation
            if (!validateEmail(email)) {
                return NextResponse.json({ success: false, message: 'Invalid email format' }, { status: 400 });
            }

            if (!validateOTP(otp)) {
                return NextResponse.json({ success: false, message: 'OTP must be 6 digits' }, { status: 400 });
            }

            // Get stored OTP
            const record = otpStore.get(email);

            if (!record) {
                return NextResponse.json({
                    success: false,
                    message: 'No verification code found. Please request a new one.'
                }, { status: 400 });
            }

            // Check expiry
            if (Date.now() > record.expiresAt) {
                otpStore.delete(email);
                return NextResponse.json({
                    success: false,
                    message: 'Verification code expired. Please request a new one.'
                }, { status: 400 });
            }

            // Verify OTP using bcrypt
            const isValid = await bcrypt.compare(otp, record.hashedOTP);

            if (!isValid) {
                return NextResponse.json({
                    success: false,
                    message: 'Invalid verification code'
                }, { status: 400 });
            }

            // Save to database
            await saveUserToDb(record.name, email);

            // Clear OTP and rate limit
            otpStore.delete(email);
            resetRateLimit(`otp-send:${email}`);

            // Send welcome/confirmation email
            try {
                await sendWelcomeEmail(email, record.name);
            } catch (error) {
                console.error('[WELCOME EMAIL ERROR]', error);
                // Don't fail verification if welcome email fails
            }

            return NextResponse.json({
                success: true,
                message: 'Email verified successfully! Welcome to Spectrum.'
            });
        }

        return NextResponse.json({ success: false, message: 'Invalid request type' }, { status: 400 });

    } catch (error) {
        console.error("[API ERROR]", error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
