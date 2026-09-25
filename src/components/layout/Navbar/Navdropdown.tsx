"use client";

import { DropdownItem } from "@/types/navbar.types";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

interface NavDropdownProps {
    items: DropdownItem[];
    isOpen: boolean;
}

export default function NavDropdown({ items, isOpen }: NavDropdownProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 z-50"
                    role="menu"
                >
                    {/* Dropdown arrow */}
                    <div className="flex justify-center mb-1">
                        <div className="w-2.5 h-2.5 rotate-45 bg-white/70 dark:bg-gray-900/80 border-l border-t border-black/5 dark:border-white/10" />
                    </div>

                    <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/30 overflow-hidden p-2">
                        {items.map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.15 }}
                            >
                                <Link
                                    href={item.href}
                                    role="menuitem"
                                    className="group flex flex-col gap-0.5 px-3.5 py-2.5 rounded-xl hover:bg-indigo-50/80 dark:hover:bg-indigo-500/10 transition-colors duration-150 focus:outline-none focus-visible:bg-indigo-50/80 dark:focus-visible:bg-indigo-500/10"
                                >
                                    <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150 font-mono">
                                        {item.label}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                        {item.description}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
