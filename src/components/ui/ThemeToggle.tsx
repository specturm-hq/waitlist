"use client";

import { useTheme } from "@/lib/theme-context";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme, actualTheme } = useTheme();

    const toggle = () => {
        setTheme(actualTheme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggle}
            className="relative p-2 rounded-full hover:bg-muted/10 transition-colors"
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6 overflow-hidden">
                <motion.div
                    initial={false}
                    animate={{
                        y: actualTheme === "dark" ? -30 : 0,
                        opacity: actualTheme === "dark" ? 0 : 1
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sun className="w-5 h-5 text-accent" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        y: actualTheme === "dark" ? 0 : 30,
                        opacity: actualTheme === "dark" ? 1 : 0
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Moon className="w-5 h-5 text-accent" />
                </motion.div>
            </div>
        </button>
    );
}
