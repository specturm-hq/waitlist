"use client";

import { motion } from "framer-motion";

export default function S07Execution() {
    return (
        <div className="w-screen md:w-[100vw] min-h-[60vh] h-auto md:h-screen flex-shrink-0 flex items-center justify-center p-4 md:p-8 box-border">
            <div className="w-full max-w-6xl h-auto min-h-[500px] md:h-[80vh] bg-panel rounded-3xl shadow-2xl border border-white/10 flex flex-col md:flex-row overflow-hidden relative">

                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                {/* Visual Partition - Enhanced Execution Card (Momentum) */}
                <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 order-2 md:order-1">
                    <div className="w-full max-w-sm bg-background p-4 md:p-6 rounded-2xl shadow-2xl border border-border overflow-hidden ring-1 ring-white/5 relative">
                        {/* Pulse Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl rounded-full pointer-events-none" />

                        <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-border pb-3 md:pb-4">
                            <div>
                                <h4 className="text-base md:text-lg font-bold">Project Momentum</h4>
                                <p className="text-[10px] md:text-xs text-muted-foreground">Keep the streak alive.</p>
                            </div>
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                <span className="text-green-500 font-bold text-xs md:text-sm">🔥</span>
                            </div>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            {/* Goals Checklist */}
                            <div className="space-y-2 md:space-y-3">
                                {[
                                    { text: "Define Core Concept", delay: 0 },
                                    { text: "Research & Outline", delay: 0.5 },
                                    { text: "First Draft / Prototype", delay: 1.0 },
                                    { text: "Review & Refine", delay: 1.5 },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: item.delay }}
                                        className="flex items-center gap-2 md:gap-3"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ delay: item.delay + 0.2, type: "spring" }}
                                            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[8px] md:text-[10px]"
                                        >
                                            ✓
                                        </motion.div>
                                        <span className={`text-xs md:text-sm ${i === 3 ? 'font-medium text-foreground' : 'text-muted-foreground line-through opacity-70'}`}>
                                            {item.text}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Progress Ring / Line */}
                            <div className="pt-3 md:pt-4">
                                <div className="flex justify-between text-[10px] md:text-xs font-medium mb-2">
                                    <span>Completion</span>
                                    <span className="text-green-500">100%</span>
                                </div>
                                <div className="h-1.5 md:h-2 w-full bg-muted/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        whileInView={{ width: "100%" }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        className="h-full bg-green-500 rounded-full"
                                    />
                                </div>
                            </div>

                            {/* Celebration / Done Status */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.2 }}
                                className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 md:p-3 text-center"
                            >
                                <span className="text-green-600 dark:text-green-400 font-bold text-xs md:text-sm">🎉  Ready to Launch!</span>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Content Partition */}
                <div className="flex-1 flex flex-col justify-center p-6 md:p-12 order-1 md:order-2 z-10">
                    <div className="max-w-md">
                        <h3 className="text-sm font-bold text-accent tracking-widest uppercase mb-3 md:mb-4">Capability 03</h3>
                        <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">Step-by-step until you're done.</h2>
                        <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-6 md:mb-8">
                            Spectrum breaks complex goals into achievable actions, guides you through execution, remembers your context, and ensures you actually finish what you start.
                        </p>
                        <div className="inline-flex items-center gap-2 text-accent font-semibold border-b border-accent/20 pb-1">
                            <span>Completion, not just consumption.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
