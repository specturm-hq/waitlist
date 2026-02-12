"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function S02Problem() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Drawing the lines - optimized timing
  const pathLength = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const areaOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 0.8]);

  // Trigger labels earlier so "Warning" is visible *during* the gap, not after
  const labelOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const yShift = useTransform(scrollYProgress, [0.2, 0.5], [10, 0]);

  return (
    <section ref={containerRef} className="min-h-[150vh] w-full flex flex-col items-center justify-center bg-background relative overflow-hidden py-16 md:py-32">

      <div className="sticky top-1/4 w-full max-w-5xl px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">The Reality</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Most ambitions die in the gap.</h2>
        </div>

        {/* The Graph Visualization container */}
        <div className="relative w-full aspect-[16/9] border-l border-b border-border/50 bg-background/20 backdrop-blur-sm rounded-tr-xl">

          {/* Y-Axis Label */}
          <div className="absolute -left-16 top-0 text-xs text-muted-foreground -rotate-90 origin-right flex items-center gap-2">
            <span>Potential</span>
            <div className="w-8 h-px bg-muted-foreground/30" />
          </div>
          {/* X-Axis Label */}
          <div className="absolute -bottom-8 right-0 text-xs text-muted-foreground flex items-center gap-2">
            <div className="w-8 h-px bg-muted-foreground/30" />
            <span>Time</span>
          </div>

          {/* SVG Graph - Using fixed viewBox for consistent coordinate system */}
          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1000 600" preserveAspectRatio="none">

            {/* Grid lines (Subtle) */}
            {[100, 200, 300, 400, 500].map(y => (
              <motion.line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="var(--border)" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="5 5" style={{ opacity: labelOpacity }} />
            ))}

            {/* LINE 1: Ambition (Exponential Growth) - Starts at (0, 600) goes to (950, 50) */}
            <motion.path
              d="M 0,600 C 300,600 500,200 950,50"
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength }}
            />

            {/* LINE 2: Actual Execution (Flat/Linear) - Starts at (0, 600) goes to (950, 450) */}
            <motion.path
              d="M 0,600 C 300,600 600,550 950,450"
              fill="none"
              stroke="var(--muted-foreground)"
              strokeWidth="2"
              strokeDasharray="8 8"
              strokeLinecap="round"
              style={{ pathLength }}
            />

            {/* THE GAP AREA (Filled) - Closed path connecting both lines */}
            <motion.path
              d="M 0,600 C 300,600 500,200 950,50 L 950,450 C 600,550 300,600 0,600 Z"
              fill="url(#gapGradient)" // Defined below
              style={{ opacity: areaOpacity }}
            />

            <defs>
              <linearGradient id="gapGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--destructive)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--destructive)" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* LABELS - Positioned with SVG coordinates */}

            {/* "What you plan" label */}
            <foreignObject x="650" y="80" width="250" height="50">
              <motion.div style={{ opacity: labelOpacity, y: yShift }} className="text-right">
                <span className="text-foreground font-bold bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border text-sm shadow-sm">
                  What you plan
                </span>
              </motion.div>
            </foreignObject>

            {/* "What you actually do" label */}
            <foreignObject x="650" y="480" width="250" height="50">
              <motion.div style={{ opacity: labelOpacity, y: yShift }} className="text-right">
                <span className="text-muted-foreground bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border/50 text-sm">
                  What you actually do
                </span>
              </motion.div>
            </foreignObject>

            {/* WARNING BOX - Centered in the widest part of the gap */}
            <foreignObject x="350" y="250" width="300" height="150">
              <motion.div
                style={{ opacity: labelOpacity, scale: labelOpacity }}
                className="flex flex-col items-center justify-center p-6"
              >
                <div className="bg-destructive/10 backdrop-blur-md border border-destructive/30 rounded-xl p-4 shadow-xl flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-destructive">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" /></svg>
                    <span className="text-xs font-bold uppercase tracking-widest">The Gap</span>
                  </div>
                  <p className="text-sm text-center text-muted-foreground leading-snug">
                    Where momentum is lost <br />and projects stall.
                  </p>
                </div>
              </motion.div>
            </foreignObject>

          </svg>

        </div>
      </div>
    </section>
  );
}
