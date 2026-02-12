"use client";

import { motion } from "framer-motion";

export default function S05Roadmaps() {
    return (
        <div className="w-screen md:w-[100vw] min-h-[60vh] h-auto md:h-screen flex-shrink-0 flex items-center justify-center p-4 md:p-8 box-border">
            <div className="w-full max-w-5xl h-auto min-h-[500px] md:h-[80vh] bg-panel rounded-3xl shadow-2xl border border-white/10 flex flex-col md:flex-row overflow-hidden">
                {/* Visual Partition - Blueprint Animation */}
                <div className="flex-1 bg-accent/5 relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-20">
                        {Array.from({ length: 400 }).map((_, i) => (
                            <div key={i} className="border-[0.5px] border-accent/30" />
                        ))}
                    </div>

                    <div className="relative w-full max-w-[200px] md:max-w-xs aspect-[3/4] bg-background/50 backdrop-blur-sm border border-accent/20 rounded-xl p-4 md:p-6 shadow-2xl">
                        {/* Corner Accents */}
                        <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-accent" />
                        <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-accent" />
                        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-accent" />
                        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-accent" />

                        <div className="h-full flex flex-col gap-4 md:gap-6 relative z-10">
                            <h4 className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-muted-foreground border-b border-border pb-2 mb-1 md:mb-2">Project: Learn Physics</h4>

                            {/* Animated Path/Roadmap */}
                            {[
                                { title: "Basic Mechanics", status: "completed" },
                                { title: "Newton's Laws", status: "completed" },
                                { title: "Conservation", status: "active" },
                                { title: "Thermodynamics", status: "pending" },
                                { title: "Quantum Basics", status: "pending" }
                            ].map((task, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2, duration: 0.5 }}
                                    className="flex items-center gap-3 md:gap-4"
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${task.status === 'active' ? 'bg-accent shadow-[0_0_10px_var(--accent)]' : task.status === 'completed' ? 'bg-green-500' : 'bg-muted border border-border'}`} />
                                        {i !== 4 && <div className="w-px h-5 md:h-8 bg-border" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-2 w-full bg-muted/10 rounded mb-1 flex items-center pr-2">
                                            <span className="text-[9px] md:text-[10px] font-medium text-foreground/80 bg-background/50 px-1.5 md:px-2 py-0.5 rounded border border-border/50 w-full truncate">{task.title}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Partition */}
                <div className="flex-1 flex flex-col justify-center p-6 md:p-12 bg-background/50 backdrop-blur-md">
                    <h3 className="text-sm font-bold text-accent tracking-widest uppercase mb-3 md:mb-4">Capability 01</h3>
                    <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">Your goals become your roadmap.</h2>
                    <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
                        Spectrum generates personalized learning + execution roadmaps tailored to what you want to build—not generic courses, your specific path.
                    </p>
                </div>
            </div>
        </div>
    );
}
