export interface DropdownItem {
    label: string;
    description: string;
    href: string;
}

export interface NavItemType {
    label: string;
    href?: string;
    dropdown?: DropdownItem[];
}
