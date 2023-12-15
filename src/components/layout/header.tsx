// import { ThemeToggle } from "@/components/layout/theme-toggle";
// import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { UserNav, UserProps } from "@/components/layout/user-nav";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Boxes, Search, Truck } from "lucide-react";
// import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
    // const { data: sessionData } = useSession();

    // fake user data for testing
    const userProp:UserProps = {
        user: {
            name: "Jason",
            email: "test@gmail.com",
        }
    }

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
                        {/* need icon but idk how to put it in the input lol */}
                        {/* <Search /> */}
                        <Input type="text" placeholder="Search something" className="pl-4 pr-4"/>
                    </div>

                    {/* need theme toggle and session data according to user */}
                    
                    {/* <ThemeToggle /> */}
                    {/* {sessionData?.user ? (
                        <UserNav user={sessionData.user} />
                    ) : (
                        <Button
                            variant="default"
                            className="text-sm"
                            // onClick={() => {
                            //     void signOut();
                            // }}
                        >
                            Sign In
                        </Button>
                    )} */}

                    <UserNav user={userProp.user} />
                </div>
            </nav>
        </div>
    );
}