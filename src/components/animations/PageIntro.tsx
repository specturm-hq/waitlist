"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageIntro({ children }: { children: React.ReactNode }) {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setComplete(true), 800); // Intro duration reduced
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Intro Overlay */}
            {!complete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    onAnimationComplete={() => setComplete(true)}
                    className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center pointer-events-none"
                >
                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-12 h-12 bg-accent rounded-full mb-4"
                        />
                    </div>
                </motion.div>
            )}

            <div className={complete ? "" : "opacity-0"}>
                {children}
            </div>
        </>
    );
}
