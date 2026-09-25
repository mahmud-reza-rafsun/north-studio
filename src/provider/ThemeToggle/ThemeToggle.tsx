"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 animate-pulse" />
        );
    }

    // system theme-সহ বর্তমানে ডার্ক মোড একটিভ আছে কি না তা চেক করা
    const isDark = (resolvedTheme || theme) === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <motion.button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="relative w-9 h-9 flex items-center cursor-pointer justify-center rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:shadow-[0_0_12px_rgba(99,102,241,0.25)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={isDark ? "dark" : "light"}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
            </AnimatePresence>
        </motion.button>
    );
}
