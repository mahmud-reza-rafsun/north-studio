"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function PrismLogo() {
    return (
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg">
            <motion.div
                whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    {/* Prism shape */}
                    <defs>
                        <linearGradient id="prism-top" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#a78bfa" />
                        </linearGradient>
                        <linearGradient id="prism-left" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#4f46e5" />
                        </linearGradient>
                        <linearGradient id="prism-right" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#c4b5fd" />
                            <stop offset="100%" stopColor="#818cf8" />
                        </linearGradient>
                        {/* Glow filter */}
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* 3D Prism — top face */}
                    <polygon
                        points="16,2 30,10 16,18 2,10"
                        fill="url(#prism-top)"
                        filter="url(#glow)"
                    />
                    {/* Left face */}
                    <polygon
                        points="2,10 16,18 16,30 2,22"
                        fill="url(#prism-left)"
                    />
                    {/* Right face */}
                    <polygon
                        points="30,10 16,18 16,30 30,22"
                        fill="url(#prism-right)"
                    />
                </svg>
            </motion.div>

            <motion.span
                whileHover={{ letterSpacing: "0.04em" }}
                transition={{ duration: 0.3 }}
                className="font-mono text-lg font-semibold tracking-tight text-gray-900 dark:text-white"
            >
                Prism
            </motion.span>
        </Link>
    );
}
