"use client";

import { motion, useSpring, useTransform, MotionValue } from "motion/react";

interface HeroShowcaseProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

function MiniCard({ title, value, change, color }: { title: string; value: string; change: string; color: string }) {
    return (
        <div className="rounded-xl bg-white/5 dark:bg-white/[0.04] border border-white/10 p-3 flex flex-col gap-1.5">
            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-wider">{title}</span>
            <span className="text-base font-semibold text-gray-900 dark:text-white font-mono">{value}</span>
            <span className={`text-[10px] font-mono ${color}`}>{change}</span>
        </div>
    );
}

function CodeBlock() {
    return (
        <div className="rounded-xl bg-black/20 dark:bg-black/40 border border-white/5 p-3 font-mono text-[10px] leading-relaxed">
            <div className="flex gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-400/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                <span className="w-2 h-2 rounded-full bg-green-400/60" />
            </div>
            <div className="text-indigo-400">import <span className="text-violet-400">{"{ Prism }"}</span> <span className="text-gray-500">from</span> <span className="text-emerald-400">'@prism/core'</span></div>
            <div className="text-gray-600 mt-1">{"// Initialize studio"}</div>
            <div className="text-cyan-400 mt-0.5">const <span className="text-white">studio</span> <span className="text-gray-500">=</span> <span className="text-yellow-400">Prism</span><span className="text-gray-400">.create({"{}"})</span></div>
            <div className="text-gray-600 mt-1">{"// Deploy anywhere"}</div>
            <div className="text-cyan-400 mt-0.5"><span className="text-white">studio</span><span className="text-gray-400">.deploy(<span className="text-emerald-400">'prod'</span>)</span></div>
        </div>
    );
}

function UIComponentPreview() {
    return (
        <div className="rounded-xl bg-white/5 dark:bg-white/[0.03] border border-white/10 p-3 space-y-2">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_6px_#6366f1]" />
                <span className="text-[10px] font-mono text-gray-400">UI Components</span>
            </div>
            {/* Fake nav */}
            <div className="flex gap-1.5">
                {["Home", "Work", "Studio"].map((item, i) => (
                    <span key={item} className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${i === 0 ? "bg-indigo-500/30 text-indigo-300 border border-indigo-500/30" : "text-gray-500"}`}>
                        {item}
                    </span>
                ))}
            </div>
            {/* Fake bars */}
            <div className="space-y-1.5">
                {[80, 55, 70, 40].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div
                            className="h-1.5 rounded-full"
                            style={{
                                width: `${w}%`,
                                background: `linear-gradient(90deg, ${["#6366f1", "#8b5cf6", "#22d3ee", "#6366f1"][i]}, transparent)`,
                                opacity: 0.7,
                            }}
                        />
                        <span className="text-[8px] font-mono text-gray-600">{w}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function HeroShowcase({ mouseX, mouseY }: HeroShowcaseProps) {
    const rotateX = useTransform(mouseY, [-300, 300], [4, -4]);
    const rotateY = useTransform(mouseX, [-500, 500], [-5, 5]);
    const smoothRotateX = useSpring(rotateX, { stiffness: 40, damping: 20 });
    const smoothRotateY = useSpring(rotateY, { stiffness: 40, damping: 20 });

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-3xl mx-auto mt-16 lg:mt-20"
            style={{ perspective: 1200 }}
        >
            {/* Outer glow */}
            <div className="absolute -inset-8 rounded-3xl bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />
            <div className="absolute -inset-4 rounded-3xl bg-violet-500/5 blur-2xl dark:bg-violet-500/10" />

            <motion.div
                style={{ rotateX: smoothRotateX, rotateY: smoothRotateY }}
                className="relative"
            >
                {/* Browser chrome */}
                <div className="rounded-2xl bg-white/5 dark:bg-white/[0.03] border border-white/10 dark:border-white/[0.08] backdrop-blur-xl shadow-2xl overflow-hidden">

                    {/* Browser bar */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        </div>
                        <div className="flex-1 mx-4">
                            <div className="bg-white/5 border border-white/5 rounded-md px-3 py-1 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                                <span className="text-[10px] font-mono text-gray-500">prismstudio.io/dashboard</span>
                            </div>
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="p-4 grid grid-cols-12 gap-3">

                        {/* Left sidebar */}
                        <div className="col-span-3 space-y-2">
                            <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-2.5">
                                <div className="w-4 h-4 rounded bg-indigo-500/40 mb-2" />
                                <div className="space-y-1.5">
                                    {["Projects", "Analytics", "Components", "Deploy"].map((item, i) => (
                                        <div key={item} className={`text-[9px] font-mono px-2 py-1 rounded ${i === 0 ? "bg-indigo-500/20 text-indigo-300" : "text-gray-600"}`}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <UIComponentPreview />
                        </div>

                        {/* Main panel */}
                        <div className="col-span-6 space-y-3">
                            {/* Hero preview */}
                            <div className="rounded-xl bg-gradient-to-br from-indigo-950/50 to-violet-950/50 border border-white/5 p-4 h-28 flex flex-col justify-between">
                                <div className="space-y-1.5">
                                    <div className="h-2 w-16 rounded bg-white/20" />
                                    <div className="h-3 w-32 rounded bg-white/30" />
                                    <div className="h-1.5 w-24 rounded bg-white/10" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-6 w-16 rounded-full bg-gradient-to-r from-indigo-500/60 to-violet-500/60 border border-indigo-400/30" />
                                    <div className="h-6 w-16 rounded-full bg-white/5 border border-white/10" />
                                </div>
                            </div>
                            <CodeBlock />
                        </div>

                        {/* Right metrics */}
                        <div className="col-span-3 space-y-2">
                            <MiniCard title="Performance" value="98/100" change="↑ +3 this week" color="text-emerald-400" />
                            <MiniCard title="Uptime" value="99.9%" change="↑ All systems" color="text-emerald-400" />
                            <MiniCard title="Load Time" value="0.8s" change="↓ −0.2s" color="text-cyan-400" />
                        </div>

                    </div>

                    {/* Bottom bar */}
                    <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between">
                        <div className="flex gap-3">
                            {["Design", "Build", "Deploy"].map((tab, i) => (
                                <span key={tab} className={`text-[9px] font-mono ${i === 0 ? "text-indigo-400" : "text-gray-600"}`}>
                                    {tab}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34d399]" />
                            <span className="text-[9px] font-mono text-gray-600">Live</span>
                        </div>
                    </div>
                </div>

                {/* Floating cards */}
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-6 top-12 rounded-xl bg-white/5 dark:bg-white/[0.04] backdrop-blur-xl border border-white/10 p-3 shadow-xl hidden lg:block"
                >
                    <div className="text-[9px] font-mono text-gray-500 mb-1">CLIENTS</div>
                    <div className="text-lg font-bold font-mono text-white">120+</div>
                    <div className="text-[9px] font-mono text-emerald-400">↑ Growing</div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -right-6 top-16 rounded-xl bg-white/5 dark:bg-white/[0.04] backdrop-blur-xl border border-white/10 p-3 shadow-xl hidden lg:block"
                >
                    <div className="text-[9px] font-mono text-gray-500 mb-1">STACK</div>
                    <div className="flex gap-1">
                        {["#6366f1", "#8b5cf6", "#22d3ee"].map((c, i) => (
                            <div key={i} className="w-4 h-4 rounded-full" style={{ background: c, opacity: 0.8 }} />
                        ))}
                    </div>
                    <div className="text-[9px] font-mono text-gray-400 mt-1">Modern</div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
