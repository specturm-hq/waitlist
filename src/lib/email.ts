import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function sendOTPEmail(email: string, otp: string, name: string): Promise<boolean> {
    try {
        const info = await transporter.sendMail({
            from: '"Spectrum" <' + process.env.GMAIL_USER + '>',
            to: email,
            subject: '🔐 Your Spectrum Verification Code',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Spectrum Verification</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                    </style>
                </head>
                <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Inter', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a;">
                        <tr>
                            <td align="center" style="padding: 40px 20px;">
                                <!-- Main Container -->
                                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #111111; border-radius: 16px; border: 1px solid #333333; overflow: hidden;">
                                    
                                    <!-- Header -->
                                    <tr>
                                        <td align="center" style="padding: 40px 0 30px; background-color: #111111; border-bottom: 1px solid #222222;">
                                            <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Spectrum</h1>
                                            <p style="margin: 8px 0 0; font-size: 11px; color: #666666; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Operating System for Execution</p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px 40px;">
                                            <h2 style="margin: 0 0 20px; font-size: 24px; font-weight: 700; color: #ffffff;">Welcome, ${name.split(' ')[0]}</h2>
                                            <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #bbbbbb;">
                                                Use the code below to complete your verification. This code will expire in 5 minutes.
                                            </p>
                                            
                                            <!-- OTP Box -->
                                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="padding: 30px; background-color: #000000; border-radius: 12px; border: 1px solid #333333;">
                                                        <span style="font-family: 'Courier New', monospace; font-size: 42px; font-weight: 700; color: #ffffff; letter-spacing: 8px;">${otp}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <p style="margin: 30px 0 0; font-size: 14px; color: #666666; text-align: center;">
                                                If you didn't request this code, you can safely ignore this email.
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="padding: 30px; background-color: #050505; border-top: 1px solid #222222; text-align: center;">
                                            <p style="margin: 0; font-size: 12px; color: #444444;">
                                                &copy; 2026 Spectrum Inc. All rights reserved.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        });

        console.log('[EMAIL SENT]', info.messageId);
        return true;
    } catch (error) {
        console.error('[EMAIL ERROR]', error);
        return false;
    }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    try {
        const info = await transporter.sendMail({
            from: '"Spectrum" <' + process.env.GMAIL_USER + '>',
            to: email,
            subject: 'You\'re on the list! 🚀',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to Spectrum</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                    </style>
                </head>
                <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Inter', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a;">
                        <tr>
                            <td align="center" style="padding: 40px 20px;">
                                <!-- Main Container -->
                                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #111111; border-radius: 16px; border: 1px solid #333333; overflow: hidden;">
                                    
                                    <!-- Header -->
                                    <tr>
                                        <td align="center" style="padding: 50px 0; background-color: #000000; border-bottom: 1px solid #222222;">
                                            <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
                                            <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff;">You're in.</h1>
                                        </td>
                                    </tr>
                                    
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px 40px;">
                                            <h2 style="margin: 0 0 20px; font-size: 20px; font-weight: 600; color: #ffffff;">Hi ${name.split(' ')[0]},</h2>
                                            <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #bbbbbb;">
                                                Thanks for joining the Spectrum waitlist. You've secured your spot to experience the future of execution intelligence.
                                            </p>
                                            
                                            <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; border-left: 4px solid #ffffff; margin: 30px 0;">
                                                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #cccccc; font-style: italic;">
                                                    "Spectrum is the operating system for execution. We're building the bridge between ideas and reality."
                                                </p>
                                            </div>
                                            
                                            <p style="margin: 0 0 10px; font-size: 16px; line-height: 1.6; color: #bbbbbb;">
                                                We'll be in touch soon with exclusive updates and early access invitations.
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="padding: 30px; background-color: #050505; border-top: 1px solid #222222; text-align: center;">
                                            <p style="margin: 0 0 10px; font-size: 12px; color: #444444;">
                                                &copy; 2026 Spectrum Inc.
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `,
        });

        console.log('[WELCOME EMAIL SENT]', info.messageId);
        return true;
    } catch (error) {
        console.error('[WELCOME EMAIL ERROR]', error);
        return false;
    }
}
