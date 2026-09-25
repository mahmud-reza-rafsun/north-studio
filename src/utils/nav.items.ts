import { NavItemType } from "@/types/navbar.types";

export const NAV_ITEMS: NavItemType[] = [
    {
        label: "Company",
        dropdown: [
            { label: "Our Story", description: "How Prism started and where we're headed", href: "/company/story" },
            { label: "Team", description: "The people building the future", href: "/company/team" },
            { label: "Careers", description: "Join us and shape what's next", href: "/company/careers" },
            { label: "Press", description: "News and media resources", href: "/company/press" },
        ],
    },
    {
        label: "Service",
        dropdown: [
            { label: "Design System", description: "Tokens, components, and guidelines", href: "/service/design-system" },
            { label: "Consulting", description: "Expert guidance for your team", href: "/service/consulting" },
            { label: "Integration", description: "Connect your existing stack", href: "/service/integration" },
        ],
    },
    {
        label: "Platform",
        dropdown: [
            { label: "Dashboard", description: "Your command center for everything", href: "/platform/dashboard" },
            { label: "Analytics", description: "Real-time insights at a glance", href: "/platform/analytics" },
            { label: "Automation", description: "Build workflows without code", href: "/platform/automation" },
            { label: "API", description: "Extend and integrate with ease", href: "/platform/api" },
        ],
    },
    {
        label: "Pricing",
        href: "/pricing",
    },
    {
        label: "About",
        href: "/about",
    },
];
