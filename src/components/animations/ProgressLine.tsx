"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion, useTransform } from "framer-motion";

export default function ProgressLine() {
    const { progress } = useScrollProgress();

    // Line height calculation:
    // We want the line to fill as we scroll.
    // Using Framer Motion's useTransform to map scroll 0-1 to path length 0-1.

    const pathLength = useTransform(progress, [0, 0.95], [0, 1]);
    const opacity = useTransform(progress, [0, 0.1], [0, 1]);

    return (
        <div className="fixed left-6 (md:left-10) top-0 bottom-0 w-px z-50 pointer-events-none hidden md:block">
            {/* Background Track */}
            <div className="absolute inset-0 bg-border/30 w-px" />

            {/* Active Line */}
            <svg className="h-full w-2 overflow-visible" preserveAspectRatio="none">
                <motion.line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    style={{ pathLength, opacity }}
                />
            </svg>
        </div>
    );
}
