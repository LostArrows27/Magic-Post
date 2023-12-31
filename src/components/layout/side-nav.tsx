"use client";
import Link from "next/link";

import { type NavItem } from "@/types/nav-item";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { buttonVariants } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/layout/subnav-accordion";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useUser } from "@/hooks/useUser";

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");
  const { userDetails } = useUser();

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

    return (
        <nav className="space-y-2">
            {items.map((item) =>
                (item.role.includes(userDetails.role)) && (item.isChidren ? (
                    <Accordion
                        type="single"
                        collapsible
                        className="space-y-2"
                        key={item.title}
                        value={openItem}
                        onValueChange={setOpenItem}
                    >
                        <AccordionItem value={item.title} className="border-none">
                            <AccordionTrigger
                                className={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-border hover:no-underline"
                                )}
                            >
                                <div>
                                    <item.icon className={cn("h-5 w-5", item.color)} />
                                </div>
                                <div
                                    className={cn(
                                        "absolute left-12 text-base duration-200",
                                        !isOpen && className
                                    )}
                                >
                                    {item.title}
                                </div>

                                {isOpen && (
                                    <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                                )}
                            </AccordionTrigger>
                            <AccordionContent className="ml-4 mt-2 space-y-4">
                                {item.children?.map((child) => (
                                    <Link
                                        key={child.title}
                                        href={child.href}
                                        onClick={() => {
                                            if (setOpen) setOpen(false);
                                        }}
                                        className={cn(
                                            buttonVariants({ variant: "ghost" }),
                                            "group flex h-12 justify-start gap-x-3 hover:bg-border",
                                            path === child.href && "bg-border font-bold hover:bg-opacity-50"
                                        )}
                                    >
                                        <child.icon className={cn("h-5 w-5", child.color)} />
                                        <div
                                            className={cn(
                                                "text-base duration-200",
                                                !isOpen && className
                                            )}
                                        >
                                            {child.title}
                                        </div>
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ) : (
                    <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => {
                            if (setOpen) setOpen(false);
                        }}
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "group relative flex h-12 justify-start hover:bg-border",
                            path === item.href && "bg-border font-bold hover:bg-border"
                        )}
                    >
                        <item.icon className={cn("h-5 w-5", item.color)} />
                        <span
                            className={cn(
                                "absolute left-12 text-base duration-200",
                                !isOpen && className
                            )}
                        >
                            {item.title}
                        </span>
                    </Link>
                )
            ))}
        </nav>
    );
}
