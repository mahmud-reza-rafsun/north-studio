"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project.types";
import { PROJECTS } from "@/utils/projec.items";

// ── Modal ──────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 16 }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-10 w-full max-w-lg rounded-2xl bg-[#0a0b12] border border-white/[0.08] shadow-2xl overflow-hidden"
                >
                    {/* Top gradient bar */}
                    <div className={`h-px w-full bg-gradient-to-r ${project.gradient}`} />

                    <div className="p-6 flex flex-col gap-5">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-1.5">
                                <span className="font-mono text-xs text-gray-600">{project.year}</span>
                                <h2 className="font-sans text-xl font-bold text-white">{project.title}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all duration-150 flex-shrink-0"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Status */}
                        <span
                            className={`self-start text-[10px] font-mono px-2.5 py-1 rounded-full border ${project.status === "Live"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : project.status === "In Progress"
                                    ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                    : "bg-violet-500/10 text-violet-400 border-violet-500/20"
                                }`}
                        >
                            {project.status}
                        </span>

                        {/* Long description */}
                        <p className="font-sans text-sm text-gray-400 leading-relaxed">
                            {project.longDescription}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-gray-500"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Links */}
                        {(project.link || project.github) && (
                            <div className="flex gap-4 pt-1">
                                {project.link && (
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors"
                                    >
                                        <ExternalLink size={12} /> Live Site
                                    </Link>
                                )}
                                {project.github && (
                                    <Link
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors"
                                    >
                                        GitHub
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// ── Main Section ───────────────────────────────────────────────
export default function OurProjects() {
    const [selected, setSelected] = useState<Project | null>(null);

    return (
        <>
            <section className="relative w-full py-24 px-4">
                <div className="max-w-6xl mx-auto flex flex-col gap-16">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="flex flex-col gap-3 max-w-xl"
                    >
                        <span className="font-mono text-xs font-medium tracking-[0.2em] text-indigo-400 uppercase">
                            Our Work
                        </span>
                        <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white leading-[1.1]">
                            Projects That{" "}
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #22d3ee 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Define Us.
                            </span>
                        </h2>
                        <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-md">
                            A curated selection of digital products and platforms we've designed, built, and shipped for real businesses.
                        </p>
                    </motion.div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {PROJECTS.map((project: any, i: any) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={i}
                                onOpen={setSelected}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selected && (
                <ProjectModal
                    project={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </>
    );
}
