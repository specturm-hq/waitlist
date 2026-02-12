"use client";

import { useScroll } from "@/lib/scroll-context";
import { useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export const useScrollProgress = () => {
    const { lenis } = useScroll();
    const progress = useMotionValue(0);
    const [velocity, setVelocity] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        if (!lenis) return;

        const update = (e: any) => {
            progress.set(e.progress);
            setVelocity(e.velocity);
            setDirection(e.direction);
        };

        lenis.on('scroll', update);
        // Set initial
        progress.set(lenis.progress);

        return () => {
            lenis.off('scroll', update);
        };
    }, [lenis, progress]);

    return {
        progress,
        velocity,
        direction,
    };
};
