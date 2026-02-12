"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import WaitlistForm from "@/components/ui/WaitlistForm";

export default function S10Conversion() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <section id="conversion-section" className="min-h-[80vh] w-full flex flex-col items-center justify-center relative transition-colors duration-700 bg-background overflow-hidden">
            {/* Theater Mode Overlay */}
            <div
                className={cn(
                    "absolute inset-0 bg-background/90 z-0 transition-opacity duration-500 pointer-events-none",
                    isFocused ? "opacity-100" : "opacity-0"
                )}
            />

            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-2">Join the early access.</h2>
                <p className="text-muted-foreground mb-8">Stop collecting knowledge. Start building real outcomes.</p>

                {/* Shimmer border container */}
                <div className={cn(
                    "relative rounded-2xl p-px transition-all duration-500",
                    isFocused
                        ? "bg-gradient-to-r from-accent/30 via-accent/60 to-accent/30 animate-gradient-border"
                        : "bg-border/30"
                )}>
                    <div className="bg-background rounded-2xl p-4">
                        <WaitlistForm
                            onFocusChange={setIsFocused}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
