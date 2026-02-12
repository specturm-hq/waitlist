"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll } from "@/lib/scroll-context";

export const useSectionTrigger = (ref: React.RefObject<HTMLElement | null>, options = {}) => {
    const [isActive, setIsActive] = useState(false);
    const [progress, setProgress] = useState(0);
    const { lenis } = useScroll();

    useEffect(() => {
        if (typeof window === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);

        const element = ref.current;
        if (!element) return;

        const trigger = ScrollTrigger.create({
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => setIsActive(self.isActive),
            onUpdate: (self) => setProgress(self.progress),
            ...options,
        });

        return () => {
            trigger.kill();
        };
    }, [ref, lenis, options]);

    return { isActive, progress };
};
