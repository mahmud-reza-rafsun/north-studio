"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "motion/react";

interface HeroBackgroundProps {
    mouseX: ReturnType<typeof useMotionValue<number>>;
    mouseY: ReturnType<typeof useMotionValue<number>>;
}

export default function HeroBackground({ mouseX, mouseY }: HeroBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        type Line = {
            speed: number;
            hue: number;
            alpha: number;
            offset: number;
            amplitude: number;
            frequency: number;
            thickness: number;
            length: number;
            progress: number;
            direction: number;
            startX: number;
            y: number;
        };

        const HUES = [220, 245, 260, 195, 230];

        const spawnLine = (): Line => {
            const direction = Math.random() > 0.5 ? 1 : -1;
            return {
                speed: 0.3 + Math.random() * 0.5,
                hue: HUES[Math.floor(Math.random() * HUES.length)],
                alpha: 0.12 + Math.random() * 0.25,
                offset: Math.random() * Math.PI * 2,
                amplitude: 20 + Math.random() * 60,
                frequency: 0.003 + Math.random() * 0.006,
                thickness: 0.5 + Math.random() * 0.8,
                length: 120 + Math.random() * 200,
                progress: 0,
                direction,
                startX: direction === 1 ? -250 : canvas.width + 250,
                y: Math.random() * canvas.height,
            };
        };

        const lines: Line[] = [];
        for (let i = 0; i < 14; i++) {
            const l = spawnLine();
            l.progress = Math.random() * l.length;
            lines.push(l);
        }

        let t = 0;

        const draw = () => {
            t += 0.008;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (lines.length < 18 && Math.random() < 0.02) {
                lines.push(spawnLine());
            }

            lines.forEach((line, idx) => {
                line.progress += line.speed;

                const endX = line.direction === 1
                    ? line.startX + line.progress
                    : line.startX - line.progress;

                if (
                    (line.direction === 1 && endX - line.length > canvas.width + 50) ||
                    (line.direction === -1 && endX + line.length < -50)
                ) {
                    lines[idx] = spawnLine();
                    return;
                }

                const headX = line.direction === 1
                    ? line.startX + line.progress
                    : line.startX - line.progress;

                ctx.beginPath();

                const steps = 60;
                for (let s = 0; s <= steps; s++) {
                    const frac = s / steps;
                    const px = headX - line.direction * frac * line.length;
                    const py = line.y
                        + Math.sin(px * line.frequency + t + line.offset) * line.amplitude
                        + Math.sin(px * line.frequency * 0.4 + t * 0.6) * (line.amplitude * 0.4);

                    if (s === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }

                const grad = ctx.createLinearGradient(
                    headX, line.y,
                    headX - line.direction * line.length, line.y
                );
                grad.addColorStop(0, `hsla(${line.hue}, 75%, 65%, ${line.alpha})`);
                grad.addColorStop(0.5, `hsla(${line.hue}, 75%, 65%, ${line.alpha * 0.5})`);
                grad.addColorStop(1, `hsla(${line.hue}, 75%, 65%, 0)`);

                ctx.strokeStyle = grad;
                ctx.lineWidth = line.thickness;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.stroke();
            });

            animRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Base */}
            <div className="absolute inset-0 bg-[#04050a]" />

            {/* Ambient orbs */}
            <motion.div
                className="absolute rounded-full blur-[130px] opacity-[0.14]"
                style={{
                    width: 650, height: 650,
                    background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
                    top: "-10%", left: "-8%",
                }}
                animate={{ x: [0, 25, 0], y: [0, -18, 0] }}
                transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute rounded-full blur-[160px] opacity-[0.10]"
                style={{
                    width: 550, height: 550,
                    background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
                    top: "15%", right: "-5%",
                }}
                animate={{ x: [0, -35, 0], y: [0, 28, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
                className="absolute rounded-full blur-[100px] opacity-[0.08]"
                style={{
                    width: 380, height: 380,
                    background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
                    bottom: "15%", left: "35%",
                }}
                animate={{ x: [0, 18, 0], y: [0, -25, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />

            {/* Flowing lines canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `linear-gradient(rgba(99,102,241,0.6) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99,102,241,0.6) 1px, transparent 1px)`,
                    backgroundSize: "64px 64px",
                }}
            />

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#04050a] to-transparent" />

            {/* Glass separator */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[1px]">
                <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 30%, rgba(139,92,246,0.6) 50%, rgba(99,102,241,0.4) 70%, transparent 100%)" }} />
                <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.12) 30%, rgba(139,92,246,0.25) 50%, rgba(99,102,241,0.12) 70%, transparent 100%)" }} />
            </div>
        </div>
    );
}
