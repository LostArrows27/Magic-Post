"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { userNav } from "@/types/user-nav";
import { useSessionContext } from "@supabase/auth-helpers-react";

export function UserNav(user: userNav) {
  const { supabaseClient } = useSessionContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <Button
            variant="outline"
            className="flex gap-2 relative rounded border-neutral-300"
          >
            <Avatar className="flex w-7 h-7">
              {/* need to change avatar link according to user */}
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{user.userDetails?.full_name[0]}</AvatarFallback>
            </Avatar>
            <span className="flex text-lg">{user.userDetails?.full_name}</span>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.userDetails?.full_name && (
              <p className="font-medium">{user.userDetails.full_name}</p>
            )}
            {user.userDetails?.role && (
              <p className="w-[200px] truncate text-sm text-zinc-700 capitalize">
                {user.userDetails.role}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            className="w-full"
            onClick={async () => {
              await supabaseClient.auth.signOut();
              user.router.push("/sign-in");
            }}
          >
            <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
