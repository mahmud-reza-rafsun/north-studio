"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import PrismLogo from "./Prismlogo";
import NavItem from "./Navitem";
import ThemeToggle from "@/provider/ThemeToggle/ThemeToggle";
import TryNowButton from "@/components/Global/Button/CTAButton";
import MobileMenu from "./Mobilemenu";
import { NAV_ITEMS } from "@/utils/nav.items";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handler = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    const name = "Contact"

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
        >
            <div
                className={`
          relative mx-auto container
          bg-white/60 dark:bg-gray-950/60
          backdrop-blur-xl
          border border-black/5 dark:border-white/10
          rounded-3xl
          shadow-sm shadow-black/5 dark:shadow-black/20
          transition-shadow duration-300
          ${scrolled ? "shadow-md shadow-black/8 dark:shadow-black/30" : ""}
        `}
            >
                <div className="flex items-center justify-between px-5 py-3">
                    {/* Logo */}
                    <PrismLogo />

                    {/* Desktop Nav */}
                    <nav
                        className="hidden md:flex items-center gap-6"
                        aria-label="Main navigation"
                    >
                        {NAV_ITEMS.map((item) => (
                            <NavItem key={item.label} item={item} />
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <div className="hidden md:block">
                            <TryNowButton name={name} navLink="/pricing" />
                        </div>

                        {/* Mobile hamburger */}
                        <motion.button
                            onClick={() => setMobileOpen((p) => !p)}
                            whileTap={{ scale: 0.9 }}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 text-gray-600 dark:text-gray-300 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        >
                            <motion.span
                                animate={{ rotate: mobileOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                            </motion.span>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu — positioned relative to the navbar container */}
                <div className="relative md:hidden">
                    <MobileMenu
                        items={NAV_ITEMS}
                        isOpen={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                    />
                </div>
            </div>
        </motion.header>
    );
}
