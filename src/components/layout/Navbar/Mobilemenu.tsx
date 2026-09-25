"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { NavItemType } from "@/types/navbar.types";
import TryNowButton from "@/components/Global/Button/CTAButton";

interface MobileMenuProps {
    items: NavItemType[];
    isOpen: boolean;
    onClose: () => void;
}

function MobileNavItem({ item, onClose }: { item: NavItemType; onClose: () => void }) {
    const [expanded, setExpanded] = useState(false);

    if (!item.dropdown) {
        return (
            <Link
                href={item.href ?? "#"}
                onClick={onClose}
                className="block px-4 py-3 rounded-xl text-sm font-medium font-mono text-gray-700 dark:text-gray-200 hover:bg-indigo-50/60 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
            >
                {item.label}
            </Link>
        );
    }

    return (
        <div>
            <button
                onClick={() => setExpanded((p) => !p)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium font-mono text-gray-700 dark:text-gray-200 hover:bg-indigo-50/60 dark:hover:bg-indigo-500/10 transition-colors duration-150"
                aria-expanded={expanded}
            >
                {item.label}
                <motion.span
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400"
                >
                    <ChevronDown size={14} />
                </motion.span>
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden pl-4"
                    >
                        <div className="py-1 space-y-0.5 border-l border-indigo-100 dark:border-indigo-500/20 ml-4 pl-3">
                            {item.dropdown?.map((sub) => (
                                <Link
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={onClose}
                                    className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-mono transition-colors duration-150"
                                >
                                    {sub.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function MobileMenu({ items, isOpen, onClose }: MobileMenuProps) {
    const name = "Contact Us"
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-full left-0 right-0 mt-3 mx-4 z-50"
                >
                    <div className="bg-white/80 dark:bg-gray-900/85 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/30 overflow-hidden">
                        <nav className="p-3 space-y-0.5">
                            {items.map((item) => (
                                <MobileNavItem key={item.label} item={item} onClose={onClose} />
                            ))}
                        </nav>

                        <div className="px-4 pb-4 pt-1 border-t border-black/5 dark:border-white/5">
                            <TryNowButton name={name} />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
