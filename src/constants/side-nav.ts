import { NavItem } from "@/types/nav-item";
import { LayoutDashboard, UserPlus, Users, PlusCircle, GanttChartSquare, Package, Boxes, ListTodo, Cylinder, ActivitySquare } from "lucide-react";

export const NavItems: NavItem[] = [
    {
        title: "Master",
        icon: LayoutDashboard,
        href: "/office",
        color: "text-purple-500",
        role: ["leader"],
        isChidren: true,
        children: [
            {
                title: "Dashboard",
                icon: ListTodo,
                href: "/office/dashboard",
                color: "text-pink-500",
                role: ["leader"],
            },
            {
                title: "Hub Manager",
                icon: Cylinder,
                color: "text-pink-500",
                href: "/office/hub",
                role: ["leader"],
            },
        ],
    },
    {
        title: "Statistics",
        icon: ActivitySquare,
        href: "/office/statistics",
        color: "text-pink-500",
        role: ["tk_admin", "gd_admin"]
    },
    {
        title: "New Order",
        icon: PlusCircle,
        href: "/office/new-order",
        color: "text-green-500",
        role: ["gd_staff"]
    },
    {
        title: "Manage Orders",
        icon: GanttChartSquare,
        href: "/office/orders",
        color: "text-green-500",
        role: ["gd_admin", "gd_staff"]
    },
    {
        title: "New Transfer",
        icon: Package,
        href: "/office/new-transfer",
        color: "text-orange-500",
        role: ["tk_staff", "gd_staff"]
    },
    {
        title: "Manage Transfers",
        icon: Boxes,
        href: "/office/transfers",
        color: "text-orange-500",
        role: ["tk_admin", "gd_admin", "tk_staff", "gd_staff"]
    },
    {
        title: "New Staff",
        icon: UserPlus,
        href: "/office/new-staff",
        color: "text-sky-500",
        role: ["tk_admin", "gd_admin"]
    },
    {
        title: "Manage Staffs",
        icon: Users,
        href: "/office/staffs",
        color: "text-sky-500",
        role: ["tk_admin", "gd_admin"]
    },
];
