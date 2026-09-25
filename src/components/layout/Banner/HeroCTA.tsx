"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { ArrowRight, Layers } from "lucide-react";

function PrimaryButton() {
    const ref = useRef<HTMLButtonElement>(null);
    const [hovered, setHovered] = useState(false);

    const springX = useSpring(0, { stiffness: 80, damping: 18, mass: 0.6 });
    const springY = useSpring(0, { stiffness: 80, damping: 18, mass: 0.6 });

    const glow1X = useTransform(springX, (v) => v * 0.35);
    const glow1Y = useTransform(springY, (v) => v * 0.35);
    const glow2X = useTransform(springX, (v) => v * 0.25);
    const glow2Y = useTransform(springY, (v) => v * 0.25);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        springX.set(e.clientX - (rect.left + rect.width / 2));
        springY.set(e.clientY - (rect.top + rect.height / 2));
    };

    const handleMouseLeave = () => {
        setHovered(false);
        springX.set(0);
        springY.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center gap-2 h-11 rounded-full px-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 overflow-visible"
            style={{ background: "linear-gradient(90deg, #DBE2E6 0%, #FFF 71.63%)" }}
        >
            <motion.span
                className="pointer-events-none absolute top-1/2 left-1/2 z-[-1] h-11 w-24 rounded-full blur-md"
                style={{
                    background: "linear-gradient(270deg, #5A9FFF 0%, rgba(255,250,107,0.20) 95.12%)",
                    translateX: "-50%", translateY: "-50%",
                    x: glow1X, y: glow1Y,
                    opacity: hovered ? 1 : 0.8,
                    transition: "opacity 0.5s ease",
                }}
            />
            <motion.span
                className="pointer-events-none absolute top-1/2 left-1/2 z-[-1] h-11 w-[86px] rounded-full"
                style={{
                    background: "linear-gradient(270deg, #5A9FFF 0%, rgba(255,250,107,0.20) 95.12%)",
                    filter: "blur(7px)",
                    translateX: "-50%", translateY: "-50%",
                    x: glow2X, y: glow2Y,
                    opacity: hovered ? 1 : 0.8,
                    transition: "opacity 0.5s ease",
                }}
            />
            <span className="relative z-10 font-mono text-sm font-medium text-[#0D1017]">
                Get Started
            </span>
            <motion.span
                animate={{ x: hovered ? 3 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative z-10"
            >
                <ArrowRight size={15} strokeWidth={2.2} className="text-[#0D1017]" />
            </motion.span>
        </motion.button>
    );
}

function SecondaryButton() {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center gap-2 h-11 rounded-full px-6 cursor-pointer
                bg-white/5 dark:bg-white/[0.04] backdrop-blur-md
                border border-white/10 dark:border-white/[0.08]
                text-gray-700 dark:text-gray-300
                hover:bg-white/10 dark:hover:bg-white/[0.08]
                hover:border-indigo-400/30 dark:hover:border-indigo-400/20
                transition-all duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
            <Layers size={15} strokeWidth={1.8} />
            <span className="font-mono text-sm font-medium">Explore Services</span>
        </motion.button>
    );
}

// ── Trust avatars ──────────────────────────────────────────────
const AVATAR_COLORS = [
    { from: "#a5b4fc", to: "#6366f1" },
    { from: "#c4b5fd", to: "#8b5cf6" },
    { from: "#67e8f9", to: "#22d3ee" },
    { from: "#a5b4fc", to: "#4f46e5" },
];

function TrustLine() {
    return (
        <div className="flex items-center gap-2.5">
            {/* Avatars */}
            <div className="flex -space-x-2">
                {AVATAR_COLORS.map((c, i) => (
                    <div
                        key={i}
                        className="w-6 h-6 rounded-full border-[1.5px] border-white/10 dark:border-[#04050a]"
                        style={{
                            background: `radial-gradient(circle at 35% 35%, ${c.from}, ${c.to})`,
                        }}
                    />
                ))}
            </div>

            {/* Divider dot */}
            <span className="w-1 h-1 rounded-full bg-gray-600 dark:bg-gray-700" />

            {/* Text */}
            <p className="text-xs font-mono text-gray-500 dark:text-gray-600">
                Trusted by{" "}
                <span className="text-gray-700 dark:text-gray-400 font-medium">
                    120+ businesses
                </span>{" "}
                · no credit card required
            </p>
        </div>
    );
}

// ── Export ─────────────────────────────────────────────────────
interface HeroCTAProps {
    delay?: number;
}

export default function HeroCTA({ delay = 0 }: HeroCTAProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-center gap-4"
        >
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <PrimaryButton />
                <SecondaryButton />
            </div>

            {/* Trust line */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.25 }}
            >
                <TrustLine />
            </motion.div>
        </motion.div>
    );
}
