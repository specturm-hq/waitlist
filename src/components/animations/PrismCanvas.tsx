"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme-context";

export default function PrismCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { actualTheme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const numParticles = 50;

        // Resize
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = actualTheme === "dark"
                    ? `rgba(255, 255, 255, ${Math.random() * 0.5})`
                    : `rgba(0, 0, 0, ${Math.random() * 0.2})`;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around
                if (this.x < 0) this.x = canvas!.width;
                if (this.x > canvas!.width) this.x = 0;
                if (this.y < 0) this.y = canvas!.height;
                if (this.y > canvas!.height) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw "Prism" Triangle (Static for now, would animate with scroll)
            // Central shape
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            ctx.strokeStyle = actualTheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(cx, cy - 100);
            ctx.lineTo(cx + 100, cy + 100);
            ctx.lineTo(cx - 100, cy + 100);
            ctx.closePath();
            ctx.stroke();

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [actualTheme]);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
}
