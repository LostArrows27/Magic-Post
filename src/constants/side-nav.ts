import { NavItem } from "@/types/nav-item";
import { LayoutDashboard, UserPlus, Users, PlusCircle, GanttChartSquare, Package, Boxes, ListTodo, Cylinder, Database } from "lucide-react";

export const NavItems: NavItem[] = [
    {
        title: "Master",
        icon: LayoutDashboard,
        href: "/office",
        color: "text-purple-500",
        isChidren: true,
        children: [
            {
                title: "Dashboard",
                icon: ListTodo,
                href: "/office/dashboard",
                color: "text-pink-500",
            },
            {
                title: "Central Hub",
                icon: Database,
                color: "text-pink-500",
                href: "/office/centralhub",
            },
            {
                title: "Hub",
                icon: Cylinder,
                color: "text-pink-500",
                href: "/office/hub",
            },
        ],
    },
    {
        title: "New Order",
        icon: PlusCircle,
        href: "/office/new-order",
        color: "text-green-500",
    },
    {
        title: "Manage Orders",
        icon: GanttChartSquare,
        href: "/office/orders",
        color: "text-green-500",
    },
    {
        title: "New Transfer",
        icon: Package,
        href: "/office/new-transfer",
        color: "text-orange-500",
    },
    {
        title: "Manage Transfers",
        icon: Boxes,
        href: "/office/transfers",
        color: "text-orange-500",
    },
    {
        title: "New Staff",
        icon: UserPlus,
        href: "/office/new-staff",
        color: "text-sky-500",
    },
    {
        title: "Manage Staffs",
        icon: Users,
        href: "/office/staffs",
        color: "text-sky-500",
    },
];
