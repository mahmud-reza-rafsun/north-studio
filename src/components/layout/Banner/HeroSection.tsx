"use client";

import { useRef } from "react";
import { useMotionValue } from "motion/react";
import HeroBackground from "./Herobackground";
import HeroShowcase from "./Heroshowcase";
import HeroContent from "./HeroContent";

export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-screen w-full overflow-hidden flex flex-col"
        >
            <div>
                <HeroBackground mouseX={mouseX} mouseY={mouseY} />
                <HeroContent />
            </div>
            <div className="relative z-10 px-4 pb-16 w-full">
                <HeroShowcase mouseX={mouseX} mouseY={mouseY} />
            </div>
        </section>
    );
}
