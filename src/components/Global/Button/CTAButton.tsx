"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

export default function TryNowButton() {
    const ref = useRef<HTMLAnchorElement>(null);
    const [hovered, setHovered] = useState(false);

    const springX = useSpring(0, { stiffness: 80, damping: 18, mass: 0.6 });
    const springY = useSpring(0, { stiffness: 80, damping: 18, mass: 0.6 });

    // ✅ number return করো, string না
    const glow1X = useTransform(springX, (v) => v * 0.35);
    const glow1Y = useTransform(springY, (v) => v * 0.35);
    const glow2X = useTransform(springX, (v) => v * 0.25);
    const glow2Y = useTransform(springY, (v) => v * 0.25);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        springX.set(e.clientX - cx);
        springY.set(e.clientY - cy);
    };

    const handleMouseLeave = () => {
        setHovered(false);
        springX.set(0);
        springY.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href="/pricing"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.97 }}
            className="magnetic-button inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5A9FFF] rounded-full"
        >
            <div className="group relative z-10 w-full">

                {/* Button face */}
                <div
                    className="h-9 flex w-full cursor-pointer items-center justify-center gap-[7px] rounded-full px-6"
                    style={{
                        background: "linear-gradient(90deg, #DBE2E6 0%, #FFF 71.63%)",
                    }}
                >
                    <span className="font-mono text-sm font-medium leading-[1.4] inline-block text-[#0D1017]">
                        Try now
                    </span>

                    <motion.span
                        animate={{ x: hovered ? 4 : 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="inline-block"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#0D1017" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.span>
                </div>

                {/* Glow 1 */}
                <motion.span
                    className="pointer-events-none absolute top-1/2 left-1/2 z-[-1] h-10 w-22 rounded-full blur-md"
                    style={{
                        background: "linear-gradient(270deg, #5A9FFF 0%, rgba(255,250,107,0.20) 95.12%)",
                        translateX: "-50%",
                        translateY: "-50%",
                        x: glow1X,
                        y: glow1Y,
                        opacity: hovered ? 1 : 0.85,
                        transition: "opacity 0.5s ease",
                    }}
                />

                {/* Glow 2 */}
                <motion.span
                    className="pointer-events-none absolute top-1/2 left-1/2 z-[-1] h-10 w-[82px] rounded-full"
                    style={{
                        background: "linear-gradient(270deg, #5A9FFF 0%, rgba(255,250,107,0.20) 95.12%)",
                        filter: "blur(7px)",
                        translateX: "-50%",
                        translateY: "-50%",
                        x: glow2X,
                        y: glow2Y,
                        opacity: hovered ? 1 : 0.85,
                        transition: "opacity 0.5s ease",
                    }}
                />

            </div>
        </motion.a>
    );
}
