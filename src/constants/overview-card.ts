import { OverviewItem } from '../types/overview-item';
import { Info } from "lucide-react";

export const OverviewItems: OverviewItem[] = [
    {
        title: "Orders",
        icon: Info,
        content: "500",
        fluctuate: "+25% from last monnth",
        color:"#E1C16E",
    },
    {
        title: "Orders delivered",
        icon: Info,
        content: "375",
        fluctuate: "+75% from last monnth",
        color:"#22c35e",
    },
    {
        title: "Orders in progress",
        icon: Info,
        content: "125",
        fluctuate: "+8,05% vs last monnth",
        color:"#0047AB",
    },
    {
        title: "Orders failed",
        icon: Info,
        content: "75",
        fluctuate: "-25% vs last monnth",
        color:"#ec4547",
    },
];