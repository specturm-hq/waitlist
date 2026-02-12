"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function S01Threshold() {
    const waitlistFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdAb2MTsQGbrgZHDxurj9039N8_AKYNXzeDAjssNbLyHTJ6nA/viewform?usp=dialog";

    return (
        <section
            className="relative min-h-[85vh] md:min-h-screen w-full flex flex-col items-center justify-center z-20 overflow-visible"
        >
            {/* ── Ambient Background ── */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background via-background to-canvas opacity-80" />
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl pt-24 md:pt-28 pb-6 md:pb-12">
                {/* Overline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-6 md:mb-8"
                >
                    <span className="px-4 py-1.5 border border-border/60 rounded-full text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold backdrop-blur-md bg-background/50 shadow-sm">
                        Spectrum v1.0
                    </span>
                </motion.div>

                {/* Main Title */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] md:leading-none mb-5 md:mb-8 relative">
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="block text-foreground"
                    >
                        The Operating
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="block text-foreground"
                    >
                        System for
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="block text-accent"
                    >
                        Execution.
                    </motion.span>
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="max-w-xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-medium mb-8 md:mb-10"
                >
                    Stop collecting ideas. Start building reality.{' '}
                    <br className="hidden md:block" />
                    The only platform designed to close the gap between learning and doing.
                </motion.p>

                {/* CTA Buttons - Always clickable */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="relative z-50"
                >
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link
                            href={waitlistFormUrl}
                            target="_blank"
                            className="w-full sm:w-auto"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base sm:text-lg border border-border bg-background/50 backdrop-blur-sm text-foreground hover:bg-background/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span>Fill Survey</span>
                            </motion.button>
                        </Link>

                        <motion.button
                            onClick={() => document.getElementById("conversion-section")?.scrollIntoView({ behavior: 'smooth' })}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold text-base sm:text-lg shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_var(--accent)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <span>Join Waitlist</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </motion.button>
                    </div>
                </motion.div>
            </div>


        </section>
    );
}
