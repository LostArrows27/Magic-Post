import { NavItem } from "@/types/nav-item";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  PlusCircle,
  GanttChartSquare,
  Box,
  Boxes,
} from "lucide-react";

export const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/office",
    color: "text-purple-500",
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
    href: "/office/manage-order",
    color: "text-green-500",
  },
  {
    title: "New Transfer",
    icon: Box,
    href: "/office/new-transfer",
    color: "text-orange-500",
  },
  {
    title: "Manage Transfers",
    icon: Boxes,
    href: "/office/manage-transfer",
    color: "text-orange-500",
  },
  {
    title: "New Staff",
    icon: UserPlus,
    href: "/office/staff",
    color: "text-sky-500",
  },
  {
    title: "Manage Staffs",
    icon: Users,
    href: "/office/manage-staff",
    color: "text-sky-500",
  },
  // {
  //     title: "TodoList",
  //     icon: ListTodo,
  //     href: "/todolist",
  //     color: "text-orange-500",
  //     isChidren: true,
  //     children: [
  //         {
  //             title: "children1",
  //             icon: ListTodo,
  //             color: "text-pink-500",
  //             href: "/todolist/children1",
  //         },
  //         {
  //             title: "children2",
  //             icon: ListTodo,
  //             color: "text-pink-500",
  //             href: "/todolist/children2",
  //         },
  //         {
  //             title: "children3",
  //             icon: ListTodo,
  //             color: "text-pink-500",
  //             href: "/todolist/children3",
  //         },
  //     ],
  // },
];
