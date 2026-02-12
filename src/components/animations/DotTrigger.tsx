"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DotTrigger() {
    const dotRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        function pulseDot() {
            if (dotRef.current) {
                gsap.fromTo(dotRef.current,
                    { scale: 1 },
                    { scale: 1.5, duration: 0.3, yoyo: true, repeat: 1 }
                );
            }
        }

        // Create scroll triggers for each section
        const sections = document.querySelectorAll("section");
        const triggers: ScrollTrigger[] = [];

        sections.forEach((section) => {
            const trigger = ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => pulseDot(),
                onEnterBack: () => pulseDot()
            });
            triggers.push(trigger);
        });

        return () => {
            // Clean up all triggers
            triggers.forEach(trigger => trigger.kill());
        };
    }, []);

    // We'll rely on Framer Motion for position sync if we are mixing libs, 
    // but let's stick to GSAP if we are using ScrollTrigger.
    // Actually, syncing "current scroll top" to a fixed sidebar is tough without knowing total height.
    // Let's assume the dot sits *at the current scroll position relative to the continuous line*.
    // If the line is fixed height (viewport height), the dot moves from top to bottom of VIEWPORT as user scrolls PAGE?
    // "Vertical Narrative Progress Line... Line draws down page..."
    // If it draws down, the "drawing head" is the dot.

    // So yes, dot is at the tip.

    return (
        <div ref={containerRef} className="fixed left-6 (md:left-10) top-0 bottom-0 w-px z-[51] pointer-events-none hidden md:block">
            {/* We need the dot to be positioned based on scroll percentage of total page. */}
            {/* If scroll is 50%, dot is at 50% of viewport keyframe? No, 50% of content.
            The line usually represents "How far am I".
            If I am 50% down the page, the line should be 50% filled.
            The dot should be at `top: 50%` of the viewport.
        */}

            <div
                ref={dotRef}
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_var(--accent)]"
                style={{ top: "0%" }} // Will be updated by GSAP/Scroll
            />
        </div>
    );
}

