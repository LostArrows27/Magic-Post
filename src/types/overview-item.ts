import { type LucideIcon } from "lucide-react";

export interface OverviewItem {
    title: string;
    icon: LucideIcon;
    content: string;
    fluctuate: string;
    color?: string;
}