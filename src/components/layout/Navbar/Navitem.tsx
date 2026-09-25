"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { NavItemType } from "@/types/navbar.types";
import NavDropdown from "./Navdropdown";

interface NavItemProps {
    item: NavItemType;
}

export default function NavItem({ item }: NavItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const open = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        timeoutRef.current = setTimeout(() => setIsOpen(false), 120);
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") setIsOpen(false);
        },
        []
    );

    if (!item.dropdown) {
        return (
            <Link
                href={item.href ?? "#"}
                className="relative px-1 py-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md group"
            >
                {item.label}
                <motion.span
                    className="absolute bottom-0 left-0 h-px bg-indigo-500/60 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                />
            </Link>
        );
    }

    return (
        <div
            className="relative"
            onMouseEnter={open}
            onMouseLeave={close}
        >
            <button
                onKeyDown={handleKeyDown}
                aria-haspopup="true"
                aria-expanded={isOpen}
                className="relative flex items-center gap-1 px-1 py-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md group"
            >
                {item.label}
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 dark:text-gray-500"
                >
                    <ChevronDown size={14} />
                </motion.span>
                <motion.span
                    className="absolute bottom-0 left-0 h-px bg-indigo-500/60 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isOpen ? "100%" : 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                />
            </button>

            <NavDropdown items={item.dropdown} isOpen={isOpen} />
        </div>
    );
}
