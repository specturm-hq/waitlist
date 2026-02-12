"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import S05Roadmaps from "./S05Roadmaps";
import S06Resources from "./S06Resources";
import S07Execution from "./S07Execution";


export default function S05_07Capabilities() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // No horizontal scroll on mobile

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;

            const scrollLength = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: -scrollLength,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${scrollLength}`,
                    pin: true,
                    scrub: 1,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [isMobile]);

    // Mobile: vertical stack, no horizontal scroll
    if (isMobile) {
        return (
            <section className="w-full bg-background">
                <div className="flex flex-col">
                    <S05Roadmaps />
                    <S06Resources />
                    <S07Execution />
                </div>
            </section>
        );
    }

    // Desktop: horizontal scroll
    return (
        <section ref={containerRef} className="h-screen w-full relative overflow-hidden bg-background">
            <div ref={trackRef} className="flex h-full w-max">
                <S05Roadmaps />
                <S06Resources />
                <S07Execution />
            </div>
        </section>
    );
}
