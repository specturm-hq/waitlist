"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const scrollToConversion = () => {
        setMobileOpen(false);
        const section = document.getElementById("conversion-section");
        section?.scrollIntoView({ behavior: 'smooth' });
    };

    const waitlistFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdAb2MTsQGbrgZHDxurj9039N8_AKYNXzeDAjssNbLyHTJ6nA/viewform?usp=dialog";

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center py-4 md:py-6 px-4 pointer-events-none">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-background/80 backdrop-blur-2xl border border-border/40 rounded-2xl md:rounded-full shadow-lg px-4 md:px-6 py-3 flex items-center justify-between w-full max-w-4xl pointer-events-auto transition-all hover:bg-background/90 hover:border-border/60 hover:shadow-xl"
            >
                {/* Logo */}
                <div className="font-bold text-lg tracking-tight flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)]" />
                    Spectrum
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href={waitlistFormUrl}
                            target="_blank"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
                            >
                                Fill Survey
                            </motion.button>
                        </Link>

                        <motion.button
                            onClick={scrollToConversion}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-foreground text-background text-sm font-semibold px-5 py-2 rounded-full transition-all shadow-md hover:shadow-lg dark:bg-white dark:text-black"
                        >
                            Join Waitlist
                        </motion.button>
                    </div>

                    <div className="h-4 w-px bg-border/50 mx-1" />

                    <ThemeToggle />
                </div>

                {/* Mobile Controls */}
                <div className="flex md:hidden items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2 rounded-xl hover:bg-muted/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </motion.div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-[72px] left-4 right-4 bg-background/95 backdrop-blur-2xl border border-border/40 rounded-2xl shadow-2xl p-4 pointer-events-auto md:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            <Link
                                href={waitlistFormUrl}
                                target="_blank"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-3 rounded-xl hover:bg-muted/10"
                            >
                                Fill Survey
                            </Link>

                            <button
                                onClick={scrollToConversion}
                                className="bg-foreground text-background text-sm font-semibold px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-lg dark:bg-white dark:text-black"
                            >
                                Join Waitlist
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
