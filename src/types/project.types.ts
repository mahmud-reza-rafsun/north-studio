export type Project = {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    tags: string[];
    year: string;
    status: "Live" | "In Progress" | "Completed";
    link?: string;
    github?: string;
    gradient: string;
}
