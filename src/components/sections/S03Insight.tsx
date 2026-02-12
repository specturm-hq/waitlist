"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function S03Insight() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0.2, 0.6], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
    const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center bg-background relative overflow-hidden py-8 md:py-32">

            {/* The Beam - Connecting from previous section */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-accent/20">
                <motion.div
                    style={{ height: beamHeight }}
                    className="w-full bg-accent shadow-[0_0_30px_rgba(0,0,0,0.5)_inset]"
                />
            </div>

            <motion.div
                style={{ scale, opacity }}
                className="relative z-10 text-center max-w-4xl px-6 bg-background/80 backdrop-blur-xl p-12 rounded-3xl border border-border/50 shadow-2xl"
            >
                <p className="text-sm font-semibold tracking-widest uppercase text-accent mb-6">The Solution</p>

                <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                    Execution <br /> Intelligence.
                </h2>

                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    The missing layer that turns <span className="text-foreground font-semibold">ambition</span> into <span className="text-foreground font-semibold">action</span>.
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {[
                        { title: "Context", desc: "Knows what you're building." },
                        { title: "Guidance", desc: "Tells you the next step." },
                        { title: "Momentum", desc: "Keeps you moving forward." }
                    ].map((feature, i) => (
                        <div key={i} className="border-t border-accent/20 pt-4">
                            <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

        </section>
    );
}
