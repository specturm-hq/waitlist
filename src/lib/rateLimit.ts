// Simple in-memory rate limiting (for production, use Redis or Vercel KV)

interface RateLimitEntry {
    count: number;
    resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetAt) {
            rateLimitStore.delete(key);
        }
    }
}, 5 * 60 * 1000);

export interface RateLimitResult {
    success: boolean;
    remaining: number;
    resetAt: number;
}

/**
 * Check rate limit for a given key
 * @param key - Unique identifier (email, IP, etc.)
 * @param maxRequests - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 */
export function checkRateLimit(
    key: string,
    maxRequests: number = 3,
    windowMs: number = 10 * 60 * 1000 // 10 minutes
): RateLimitResult {
    const now = Date.now();
    const entry = rateLimitStore.get(key);

    // No entry or expired - create new
    if (!entry || now > entry.resetAt) {
        rateLimitStore.set(key, {
            count: 1,
            resetAt: now + windowMs,
        });
        return {
            success: true,
            remaining: maxRequests - 1,
            resetAt: now + windowMs,
        };
    }

    // Entry exists and not expired
    if (entry.count >= maxRequests) {
        return {
            success: false,
            remaining: 0,
            resetAt: entry.resetAt,
        };
    }

    // Increment count
    entry.count++;
    return {
        success: true,
        remaining: maxRequests - entry.count,
        resetAt: entry.resetAt,
    };
}

/**
 * Check resend cooldown (30 seconds between resend requests)
 */
export function checkResendCooldown(email: string): RateLimitResult {
    return checkRateLimit(`resend:${email}`, 1, 30 * 1000); // 1 request per 30 seconds
}

/**
 * Reset rate limit for a key (useful after successful verification)
 */
export function resetRateLimit(key: string): void {
    rateLimitStore.delete(key);
}
