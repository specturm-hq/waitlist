"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

export default function S11Closing() {
    return (
        <section className="py-20 w-full flex flex-col items-center justify-center bg-background relative overflow-hidden">
            {/* Animated gradient border at top */}
            <div className="absolute top-0 left-0 right-0 h-px">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-gradient-border" />
            </div>

            {/* Subtle background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-accent/[0.03] blur-[80px] pointer-events-none" />

            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 mb-12 relative z-10">
                From Learning<br />to Launched
            </h1>

            <div className="flex flex-col items-center gap-8 relative z-10 w-full px-6">

                {/* Social Links & Contact */}
                <div className="flex flex-wrap justify-center items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link
                        href="https://instagram.com/joinspectrum"
                        target="_blank"
                        className="flex items-center gap-2 hover:text-foreground transition-colors duration-300 group"
                    >
                        <div className="p-2 rounded-full bg-muted/10 group-hover:bg-accent/10 transition-colors">
                            <Instagram className="w-5 h-5 group-hover:text-accent transition-colors" />
                        </div>
                        <span className="hidden md:inline">Instagram</span>
                    </Link>

                    <Link
                        href="https://www.linkedin.com/in/pradyumnatg/"
                        target="_blank"
                        className="flex items-center gap-2 hover:text-foreground transition-colors duration-300 group"
                    >
                        <div className="p-2 rounded-full bg-muted/10 group-hover:bg-accent/10 transition-colors">
                            <Linkedin className="w-5 h-5 group-hover:text-accent transition-colors" />
                        </div>
                        <span className="hidden md:inline">LinkedIn</span>
                    </Link>

                    <div className="hidden md:block w-px h-6 bg-border/50" />

                    {/* Email Link - Clean Icon Only on mobile, text on desktop */}
                    <Link
                        href="mailto:spectrum.team.hq@gmail.com"
                        className="flex items-center gap-2 hover:text-foreground transition-colors duration-300 group"
                    >
                        <div className="p-2 rounded-full bg-muted/10 group-hover:bg-accent/10 transition-colors">
                            <Mail className="w-5 h-5 group-hover:text-accent transition-colors" />
                        </div>
                        <span className="hidden md:inline">spectrum.team.hq@gmail.com</span>
                    </Link>

                </div>
            </div>

            <p className="mt-16 text-xs text-muted-foreground/50 relative z-10">
                © {new Date().getFullYear()} Spectrum. All rights reserved.
            </p>
        </section>
    );
}
