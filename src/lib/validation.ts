// Input validation utilities

const disposableEmailDomains = [
    'tempmail.com',
    'guerrillamail.com',
    '10minutemail.com',
    'throwaway.email',
    'mailinator.com',
    'yopmail.com',
    'temp-mail.org',
];

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isDisposableEmail(email: string): boolean {
    const domain = email.split('@')[1]?.toLowerCase();
    return disposableEmailDomains.some(disposable => domain === disposable);
}

export function sanitizeInput(input: string): string {
    // Remove potential XSS/injection attempts
    return input
        .trim()
        .replace(/[<>]/g, '') // Remove angle brackets
        .substring(0, 255); // Limit length
}

export function validateOTP(otp: string): boolean {
    // OTP should be exactly 6 digits
    return /^\d{6}$/.test(otp);
}

export function validateName(name: string): boolean {
    // Name should be 2-50 characters, letters and spaces only
    return /^[a-zA-Z\s]{2,50}$/.test(name.trim());
}
