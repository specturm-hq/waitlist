"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function S08Emotion() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.8, 0.9], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);

    return (
        <section ref={containerRef} className="min-h-screen w-full flex items-center justify-center relative bg-background overflow-hidden pt-32">
            {/* Ambient Fluid Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-50 pointer-events-none" />

            {/* Subtle radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[100px] animate-pulse-glow pointer-events-none" />

            <motion.div
                style={{ opacity, y }}
                className="relative z-10 text-center max-w-4xl px-6"
            >
                {/* Decorative quote marks */}
                <div className="relative">
                    <span className="absolute -top-16 -left-4 md:-left-12 text-[120px] md:text-[180px] leading-none font-serif text-accent/[0.06] select-none pointer-events-none">&ldquo;</span>
                    <span className="absolute -bottom-24 -right-4 md:-right-12 text-[120px] md:text-[180px] leading-none font-serif text-accent/[0.06] select-none pointer-events-none">&rdquo;</span>

                    <h2 className="text-4xl md:text-6xl font-bold mb-8">
                        Finally finish what you start.
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed italic">
                        &ldquo;I finally have something that helps me finish what I start.&rdquo;
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
