"use client";

import { motion } from "motion/react";
import HeroCTA from "./HeroCTA";

const headingLine1 = "We Build Digital".split(" ");
const headingLine2 = "Experiences That Stand Out.".split(" ");

export default function HeroContent() {
    return (
        <div className="relative z-10 flex flex-col items-center text-center px-4 pt-32 pb-8">

            {/* Eyebrow */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-2 mb-6"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                </span>
                <span className="font-mono text-xs font-medium tracking-[0.15em] text-indigo-400 uppercase">
                    Prism Studio
                </span>
            </motion.div>

            {/* Heading */}
            <h1 className="font-sans font-bold leading-[1.08] tracking-[-0.01em] mb-6 max-w-3xl">
                {/* Line 1 */}
                <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-gray-900 dark:text-white">
                    {headingLine1.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                            className="inline-block mr-[0.22em]"
                        >
                            {word}
                        </motion.span>
                    ))}
                </span>
                {/* Line 2 — gradient */}
                <span
                    className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
                    style={{
                        background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 40%, #22d3ee 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}>
                    {headingLine2.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                            className="inline-block mr-[0.22em]"
                        >
                            {word}
                        </motion.span>
                    ))}
                </span>
            </h1>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65, ease: [0.23, 1, 0.32, 1] }}
                className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed font-sans max-w-[480px] mb-8"
            >
                Prism Studio designs and develops high-performance websites, web applications,
                and digital platforms that help businesses grow.
            </motion.p>

            {/* CTA */}
            <HeroCTA />
        </div>
    );
}
