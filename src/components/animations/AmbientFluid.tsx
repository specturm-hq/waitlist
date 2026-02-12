"use client";

import { cn } from "@/lib/utils";

export default function AmbientFluid({ className }: { className?: string }) {
    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            {/* CSS-only fluid effect using blur and animated gradients */}
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-pulse-slow opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[100px] animate-blob" />
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
                <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-4000" />
            </div>
        </div>
    );
}
