"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollContextType {
    lenis: Lenis | null;
    scrollProgress: number;
    velocity: number;
    direction: number; // 1 for down, -1 for up
}

const ScrollContext = createContext<ScrollContextType>({
    lenis: null,
    scrollProgress: 0,
    velocity: 0,
    direction: 1,
});

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        setLenis(lenisInstance);

        const onScroll = (e: any) => {
            setScrollProgress(e.progress);
            setVelocity(e.velocity);
            setDirection(e.direction);
        };

        lenisInstance.on("scroll", onScroll);

        // CRITICAL: Integrate Lenis with GSAP ScrollTrigger
        lenisInstance.on("scroll", ScrollTrigger.update);

        function raf(time: number) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Sync ScrollTrigger with Lenis
        gsap.ticker.add((time) => {
            lenisInstance.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenisInstance.destroy();
            gsap.ticker.remove((time) => lenisInstance.raf(time * 1000));
        };
    }, []);

    return (
        <ScrollContext.Provider value={{ lenis, scrollProgress, velocity, direction }}>
            {children}
        </ScrollContext.Provider>
    );
};
