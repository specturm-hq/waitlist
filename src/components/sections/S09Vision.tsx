"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function S09Vision() {
    const containerRef = useRef<HTMLElement>(null);
    const networkRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(networkRef.current, {
                scale: 1,
                opacity: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "center center",
                    scrub: 1,
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-background pt-32">
            <div className="z-10 text-center max-w-3xl px-6 mb-12">
                <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-4">Our Vision</h2>
                <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                    Building the missing execution layer of the internet.
                </h3>
            </div>

            {/* Network Background with Glow */}
            <div
                ref={networkRef}
                className="absolute inset-0 flex items-center justify-center opacity-0 scale-[3] pointer-events-none origin-center"
            >
                {/* Concentric rings with glow */}
                <div className="w-[120vw] h-[120vw] border border-dashed border-accent/[0.08] rounded-full flex items-center justify-center relative">
                    {/* Outer ring glow */}
                    <div className="absolute inset-0 rounded-full bg-accent/[0.02] blur-[40px]" />

                    <div className="w-[80vw] h-[80vw] border border-dashed border-accent/[0.08] rounded-full relative">
                        {/* Inner ring glow */}
                        <div className="absolute inset-0 rounded-full bg-accent/[0.02] blur-[30px]" />
                    </div>

                    {/* Glowing Nodes */}
                    {[...Array(8)].map((_, i) => {
                        const angle = (i / 8) * Math.PI * 2;
                        const radius = i % 2 === 0 ? 35 : 25;
                        return (
                            <div
                                key={i}
                                className="absolute"
                                style={{
                                    top: `${50 + Math.sin(angle) * radius}%`,
                                    left: `${50 + Math.cos(angle) * radius}%`,
                                }}
                            >
                                {/* Node glow */}
                                <div className="absolute -inset-3 rounded-full bg-accent/10 blur-md animate-pulse-glow" />
                                {/* Node */}
                                <div className="w-3 h-3 bg-accent/40 rounded-full relative" />
                            </div>
                        );
                    })}

                    {/* Connecting lines (decorative) */}
                    <div className="absolute inset-0">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="50" y1="15" x2="85" y2="50" stroke="currentColor" strokeWidth="0.1" className="text-accent/10" />
                            <line x1="50" y1="15" x2="15" y2="50" stroke="currentColor" strokeWidth="0.1" className="text-accent/10" />
                            <line x1="85" y1="50" x2="50" y2="85" stroke="currentColor" strokeWidth="0.1" className="text-accent/10" />
                            <line x1="15" y1="50" x2="50" y2="85" stroke="currentColor" strokeWidth="0.1" className="text-accent/10" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
