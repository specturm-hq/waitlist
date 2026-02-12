"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
    onFocusChange?: (focused: boolean) => void;
    className?: string;
}

export default function WaitlistForm({ onFocusChange, className }: WaitlistFormProps) {
    const [step, setStep] = useState<"details" | "otp">("details");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // OTP expiry countdown (5 minutes = 300 seconds)
    const [otpExpirySeconds, setOtpExpirySeconds] = useState(300);

    // Resend cooldown (30 seconds)
    const [resendCooldown, setResendCooldown] = useState(0);

    // OTP Expiry Timer
    useEffect(() => {
        if (step === "otp" && otpExpirySeconds > 0) {
            const timer = setInterval(() => {
                setOtpExpirySeconds(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step, otpExpirySeconds]);

    // Resend Cooldown Timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => {
                setResendCooldown(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setStatus("error");
            setErrorMessage("Please enter your name.");
            return;
        }

        if (!validateEmail(email)) {
            setStatus("error");
            setErrorMessage("Please enter a valid email.");
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch('/api/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'send-otp', email, name })
            });

            const data = await res.json();

            if (data.success) {
                setStep("otp");
                setStatus("idle");
                setOtpExpirySeconds(300); // Reset to 5 minutes
                setResendCooldown(30); // Start 30-second cooldown
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Failed to send OTP");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Network error. Try again.");
        }
    };

    const handleResendOtp = async () => {
        if (resendCooldown > 0) return;

        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch('/api/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'send-otp', email, name })
            });

            const data = await res.json();

            if (data.success) {
                setStatus("idle");
                setOtpExpirySeconds(300); // Reset to 5 minutes
                setResendCooldown(30); // Start 30-second cooldown
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Failed to resend OTP");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Network error. Try again.");
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.length < 6) {
            setStatus("error");
            setErrorMessage("Enter valid 6-digit code");
            return;
        }

        if (otpExpirySeconds <= 0) {
            setStatus("error");
            setErrorMessage("Code expired. Request a new one.");
            return;
        }

        setStatus("loading");

        try {
            const res = await fetch('/api/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'verify-otp', email, otp })
            });

            const data = await res.json();

            if (data.success) {
                setStatus("success");
                if (onFocusChange) onFocusChange(false);
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Invalid code");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Verification failed.");
        }
    };

    const handleFocus = () => {
        if (onFocusChange && status !== "success") onFocusChange(true);
        if (status === "error") setStatus("idle");
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn("bg-green-500/10 text-green-500 py-6 px-6 rounded-xl border border-green-500/20 text-center", className)}
            >
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🎉</span>
                </div>
                <p className="font-bold text-lg mb-1">Welcome aboard, {name.split(' ')[0]}!</p>
                <p className="text-sm opacity-80">You're officially on the list.</p>
            </motion.div>
        );
    }

    return (
        <div className={cn("relative z-20", className)}>
            <AnimatePresence mode="wait">
                {step === "details" ? (
                    <motion.form
                        key="details-form"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleSendOtp}
                        className="flex flex-col gap-3"
                    >
                        <div className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onFocus={handleFocus}
                                disabled={status === "loading"}
                                className={cn(
                                    "w-full bg-panel border outline-none px-4 py-3 rounded-xl transition-all shadow-sm focus:shadow-md input-field",
                                    status === "error" && !name ? "border-red-500" : "border-border focus:border-accent"
                                )}
                            />
                            <input
                                type="email"
                                placeholder="work@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={handleFocus}
                                disabled={status === "loading"}
                                className={cn(
                                    "w-full bg-panel border outline-none px-4 py-3 rounded-xl transition-all shadow-sm focus:shadow-md input-field",
                                    status === "error" && !validateEmail(email) ? "border-red-500" : "border-border focus:border-accent"
                                )}
                            />
                        </div>

                        {status === "error" && (
                            <p className="text-xs text-red-500 font-medium ml-1">{errorMessage}</p>
                        )}

                        <motion.button
                            type="submit"
                            disabled={status === "loading"}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-foreground text-background font-bold py-3 rounded-xl mt-1 transition-all disabled:opacity-50"
                        >
                            {status === "loading" ? "Sending Code..." : "Get Verification Code"}
                        </motion.button>
                    </motion.form>
                ) : (
                    <motion.form
                        key="otp-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onSubmit={handleVerifyOtp}
                        className="flex flex-col gap-4"
                    >
                        <div className="text-center mb-1">
                            <p className="text-sm font-medium text-muted-foreground">Code sent to {email}</p>
                            <button
                                type="button"
                                onClick={() => setStep("details")}
                                className="text-xs text-accent hover:underline mt-1"
                            >
                                Change email
                            </button>
                        </div>

                        {/* OTP Expiry Timer */}
                        <div className="flex items-center justify-center gap-2 py-2">
                            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className={cn(
                                "text-sm font-mono font-medium",
                                otpExpirySeconds <= 60 ? "text-red-500" : "text-muted-foreground"
                            )}>
                                {otpExpirySeconds > 0 ? formatTime(otpExpirySeconds) : "Expired"}
                            </span>
                        </div>

                        <input
                            type="text"
                            placeholder="Enter 6-digit code"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            onFocus={handleFocus}
                            disabled={status === "loading"}
                            className={cn(
                                "w-full bg-panel border outline-none px-4 py-3 rounded-xl text-center text-lg tracking-[0.5em] font-mono transition-all shadow-sm focus:shadow-md input-field",
                                status === "error" ? "border-red-500" : "border-border focus:border-accent"
                            )}
                        />

                        {status === "error" && (
                            <p className="text-xs text-red-500 font-medium text-center">{errorMessage}</p>
                        )}

                        <motion.button
                            type="submit"
                            disabled={status === "loading" || otpExpirySeconds <= 0}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-accent text-accent-foreground font-bold py-3 rounded-xl transition-all disabled:opacity-50"
                        >
                            {status === "loading" ? "Verifying..." : "Verify & Join"}
                        </motion.button>

                        {/* Resend Button */}
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={resendCooldown > 0 || status === "loading"}
                            className={cn(
                                "text-sm font-medium transition-colors",
                                resendCooldown > 0 || status === "loading"
                                    ? "text-muted-foreground cursor-not-allowed"
                                    : "text-accent hover:underline cursor-pointer"
                            )}
                        >
                            {resendCooldown > 0
                                ? `Resend code in ${resendCooldown}s`
                                : "Resend code"
                            }
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
