"use client"

// import { ThemeToggle } from "@/components/layout/theme-toggle";
// import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const { userDetails, user } = useUser();

    return (
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b border-b-neutral-300 bg-background/95 backdrop-blur">
            <nav className="flex h-16 items-center justify-start px-4">
                <Link
                    href={"/office"}
                    className="hidden h-full items-center justify-start pl-4 gap-2 md:flex w-60 border-r border-r-neutral-300"
                >
                    <Truck className="h-6 w-6" />
                    <h1 className="text-lg font-semibold">Magic Post</h1>
                </Link>

                <div className={cn("block md:!hidden")}>
                    {/* <MobileSidebar /> */}
                </div>

                <div className="flex items-center gap-2 justify-between flex-1">
                    <div className="flex items-center ml-6 w-96">
                        <Input type="text" placeholder="Search something" className="pl-4 pr-4"/>
                    </div>
                    
                    {/* <ThemeToggle /> */}
                    {userDetails ? (
                        <UserNav userDetails={userDetails} router={router}/>
                    ) : (
                        <Button
                            variant="default"
                            className="text-sm"
                            onClick={async () => {
                                //await supabaseClient.auth.signOut();
                                router.push("/sign-in");
                            }}
                        >
                            Sign In
                        </Button>
                    )}
                </div>
            </nav>
        </div>
    );
}