"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function S04Introduction() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const waitlistFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdAb2MTsQGbrgZHDxurj9039N8_AKYNXzeDAjssNbLyHTJ6nA/viewform?usp=dialog";

    return (
        <section ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 bg-background overflow-hidden relative">
            <div className="text-center mb-16 z-10 w-full max-w-2xl">
                <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-4">The Operating System</h2>
                <p className="text-3xl md:text-5xl font-medium mx-auto text-foreground">
                    A unified environment for execution.
                </p>
            </div>

            {/* System Interface Container - Enhanced Premium Design */}
            <div
                className={cn(
                    "w-full max-w-5xl h-[600px] md:h-auto md:aspect-[21/9] bg-[#0A0A0A] rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 relative z-10 transition-all duration-1000 overflow-hidden flex flex-col ring-1 ring-white/5",
                    isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
                )}
            >
                {/* Ambient Glow behind container */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-[100px] -z-10" />

                {/* Window Chrome - Sleek & Dark */}
                <div className="h-12 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md flex items-center px-4 justify-between shrink-0 z-20 relative">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-inner" />
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-inner" />
                        <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-inner" />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono font-medium">spectrum_core_v1.0</span>
                    </div>
                    <div /> {/* Empty div to balance flex justify-between if needed, or just remove flex justify-between */}
                </div>

                {/* Main Interface Area */}
                <div className="flex-1 relative bg-[radial-gradient(circle_at_50%_0%,_#111_0%,_#000_100%)] p-4 md:p-8 overflow-hidden">
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

                    {/* Nodes Container */}
                    <div className="relative w-full h-full">

                        {/* Central Processor (The Brain) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-80 p-px rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-transparent">
                            <div className="bg-[#050505]/95 backdrop-blur-2xl rounded-[23px] p-5 md:p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Inner Glow */}
                                <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/10 blur-3xl pointer-events-none" />

                                <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-white/5 pb-3">
                                    <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono font-bold">Execution Engine</span>
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className={`w-1.5 h-1.5 rounded-full bg-accent animate-pulse`} style={{ animationDelay: `${i * 0.2}s` }} />
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="h-10 bg-white/5 rounded-xl border border-white/10 flex items-center px-4 gap-3 group/item hover:bg-white/10 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b98150]" />
                                        <span className="text-[11px] text-zinc-300 font-mono">analyzing_intent...</span>
                                    </div>
                                    <div className="h-10 bg-white/5 rounded-xl border border-white/10 flex items-center px-4 gap-3 group/item hover:bg-white/10 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-[#8b5cf6] shadow-[0_0_10px_#8b5cf650]" />
                                        <span className="text-[11px] text-zinc-300 font-mono">generating_roadmap...</span>
                                    </div>
                                    <div className="pt-2">
                                        <div className="flex justify-between text-[9px] text-zinc-500 font-mono mb-1.5 uppercase tracking-tighter">
                                            <span>Processing Capacity</span>
                                            <span>99.9%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-accent/50 via-accent to-accent/50"
                                                animate={{ width: ["0%", "100%", "0%"], x: ["0%", "0%", "100%"] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Left */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={isVisible ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.5 }}
                            className="absolute top-[8%] left-[2%] md:left-[10%] text-[9px] md:text-xs font-mono text-zinc-300 border border-white/20 bg-black/60 backdrop-blur-xl px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-1.5 md:gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                        >
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                            Context Ingestion
                        </motion.div>

                        {/* Top Right */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={isVisible ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.6 }}
                            className="absolute top-[12%] right-[2%] md:right-[15%] text-[9px] md:text-xs font-mono text-zinc-300 border border-white/20 bg-black/60 backdrop-blur-xl px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-1.5 md:gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                        >
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
                            Model Synapse
                        </motion.div>

                        {/* Bottom Left */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={isVisible ? { y: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.8 }}
                            className="absolute bottom-[12%] left-[2%] md:left-[15%] text-[9px] md:text-xs font-mono text-zinc-300 border border-white/20 bg-black/60 backdrop-blur-xl px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-1.5 md:gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                        >
                            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_#f59e0b]" />
                            Vector Search
                        </motion.div>

                        {/* Bottom Right */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={isVisible ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.7 }}
                            className="absolute bottom-[8%] right-[2%] md:right-[10%] text-[9px] md:text-xs font-mono text-zinc-300 border border-white/20 bg-black/60 backdrop-blur-xl px-3 py-1.5 md:px-4 md:py-2 rounded-xl flex items-center gap-1.5 md:gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                        >
                            <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_var(--accent)]" />
                            Live Deployment
                        </motion.div>

                        {/* Connecting Lines (Decorative) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                            <motion.line
                                initial={{ pathLength: 0 }}
                                animate={isVisible ? { pathLength: 1 } : {}}
                                transition={{ duration: 2, delay: 1 }}
                                x1="20%" y1="20%" x2="50%" y2="50%" stroke="currentColor" className="text-white" strokeDasharray="4 4"
                            />
                            <motion.line
                                initial={{ pathLength: 0 }}
                                animate={isVisible ? { pathLength: 1 } : {}}
                                transition={{ duration: 2, delay: 1.2 }}
                                x1="80%" y1="80%" x2="50%" y2="50%" stroke="currentColor" className="text-white" strokeDasharray="4 4"
                            />
                        </svg>

                    </div>
                </div>
            </div>

            <div className="mt-12 z-10 flex flex-col items-center gap-6">
                <Link href={waitlistFormUrl} target="_blank">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm font-semibold text-zinc-400 hover:text-accent transition-colors flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/40"
                    >
                        Ready to build? Fill Waitlist Form <span className="text-lg">→</span>
                    </motion.button>
                </Link>
            </div>
        </section>
    );
}
