"use client";

import { motion } from "motion/react";
import TryNowButton from "@/components/Global/Button/CTAButton";
import { Project } from "@/types/project.types";

interface ProjectCardProps {
    project: Project;
    index: number;
    onOpen: (project: Project) => void;
}

const STATUS_STYLES = {
    "Live": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "In Progress": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    "Completed": "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

export default function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
    const buttonName = "View Details";

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
            className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden flex flex-col"
        >
            {/* Gradient top bar */}
            <div className={`h-px w-full bg-gradient-to-r ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Card glow on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            <div className="relative z-10 p-6 flex flex-col gap-4 flex-1">
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-xs text-gray-600">{project.year}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${STATUS_STYLES[project.status]}`}>
                        {project.status}
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-sans text-lg font-semibold text-white leading-snug group-hover:text-white transition-colors">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm text-gray-500 leading-relaxed flex-1">
                    {project.description}
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

                {/* CTA */}
                <div onClick={() => onOpen(project)}>
                    <TryNowButton name={buttonName} navLink />
                </div>
            </div>
        </motion.div>
    );
}
