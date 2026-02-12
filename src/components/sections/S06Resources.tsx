"use client";

import { motion } from "framer-motion";
import { FileText, Video, Github, BookOpen } from "lucide-react";

export default function S06Resources() {
    const resources = [
        {
            type: "Documentation",
            icon: FileText,
            desc: "Comprehensive guides to get you started.",
            color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
        },
        {
            type: "Video Tutorials",
            icon: Video,
            desc: "Watch step-by-step implementation tutorials.",
            color: "bg-red-500/10 text-red-600 dark:text-red-400"
        },
        {
            type: "Starter Kits",
            icon: Github,
            desc: "Clone production-ready code templates.",
            color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
        },
        {
            type: "Deep Dives",
            icon: BookOpen,
            desc: "Architecture patterns and best practices.",
            color: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
        },
    ];

    return (
        <div className="w-screen md:w-[100vw] min-h-[60vh] h-auto md:h-screen flex-shrink-0 flex items-center justify-center p-4 md:p-8 box-border">
            <div className="w-full max-w-6xl h-auto min-h-[500px] md:h-[80vh] bg-panel rounded-3xl shadow-2xl border border-white/10 flex flex-col md:flex-row overflow-hidden relative">

                {/* Background Grid (Global in card) */}
                <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] pointer-events-none" />

                {/* Left Partition: Text Content */}
                <div className="flex-1 flex flex-col justify-center p-6 md:p-12 relative z-10 order-2 md:order-1">
                    <div className="max-w-md">
                        <h3 className="text-sm font-bold text-accent tracking-widest uppercase mb-3 md:mb-4">Capability 02</h3>
                        <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">Resources that actually help.</h2>
                        <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-6 md:mb-8">
                            No more searching for the right tutorial. Spectrum curates the exact documentation, code snippets, and resources for your stack.
                        </p>

                        {/* Decorative Stat or Quote */}
                        <div className="inline-flex items-center gap-2 text-sm font-semibold bg-accent/10 text-accent px-4 py-2 rounded-full border border-accent/20">
                            <BookOpen className="w-4 h-4" />
                            <span>Context-aware curation</span>
                        </div>
                    </div>
                </div>

                {/* Right Partition: Visual Grid - Compact Cards */}
                <div className="flex-1 bg-background/50 backdrop-blur-sm relative p-4 md:p-8 flex items-center justify-center order-1 md:order-2 border-l border-white/5">
                    <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-md">
                        {resources.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="bg-background border border-border/60 p-4 md:p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-accent/40 transition-all group flex flex-col gap-3 md:gap-4 justify-between relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                                    <item.icon className="w-5 h-5 md:w-8 md:h-8" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm md:text-base mb-1 group-hover:text-foreground transition-colors">{item.type}</h4>
                                    <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
