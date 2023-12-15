"use client";

import Link from "next/link";
//import { signOut } from "next-auth/react";
//import type { User } from "next-auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

// temporary user data type, need change 
export type UserProps = {
    user: {
        name: string,
        email: string,
    };
};

export function UserNav({ user }: UserProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>
                    <Button variant="outline" className="flex gap-2 relative rounded border-neutral-300">
                        <Avatar className="flex w-auto h-7">
                            {/* need to change avatar link according to user */}
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AVT</AvatarFallback>
                        </Avatar>
                        <span className="flex text-lg">{user.name}</span>
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && <p className="font-medium">{user.name}</p>}
                        {user.email && (
                            <p className="w-[200px] truncate text-sm text-zinc-700">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Button
                        variant="outline"
                        className="w-full"
                        // onClick={() => {
                        //     void signOut();
                        // }}
                    >
                        <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                        Log Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}