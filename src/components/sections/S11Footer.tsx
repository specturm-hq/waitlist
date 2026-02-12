"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function S11Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Roadmap", href: "#roadmap" },
        { name: "Resources", href: "#resources" },
        { name: "Execution", href: "#execution" },
    ];

    const socialLinks = [
        {
            name: "Twitter",
            href: "https://twitter.com/spectrum",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com/company/spectrum",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            name: "GitHub",
            href: "https://github.com/spectrum",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="w-full bg-background border-t border-border relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 blur-[120px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-12">
                    {/* Branding Column */}
                    <div className="md:col-span-5">
                        <Link href="/" className="inline-block group">
                            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-accent group-hover:to-foreground transition-all duration-300">
                                Spectrum
                            </h3>
                        </Link>
                        <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                            The Operating System for Execution. Stop collecting ideas. Start building reality.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 mt-6">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="md:col-span-3">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="md:col-span-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                            Get in Touch
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Have questions? We'd love to hear from you.
                        </p>
                        <a
                            href="mailto:spectrum.team.hq@gmail.com"
                            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            spectrum.team.hq@gmail.com
                        </a>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="py-8 my-8 border-y border-border">
                    <div className="text-center max-w-2xl mx-auto">
                        <h4 className="text-xl md:text-2xl font-bold mb-3">
                            Ready to close the gap?
                        </h4>
                        <p className="text-sm text-muted-foreground mb-6">
                            Join the waitlist and be among the first to experience Spectrum.
                        </p>
                        <motion.a
                            href="#conversion-section"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-bold text-sm shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_var(--accent)] transition-all"
                        >
                            Join Waitlist
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </motion.a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>
                        © {currentYear} Spectrum. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-accent transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-accent transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
