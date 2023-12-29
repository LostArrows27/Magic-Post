"use client"

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function NavigationMenuBar() {
    const router = useRouter();

    return (
        <div className="flex gap-1">
            <Button variant="link" className="text-base">
                Our Service
            </Button>
            <Button variant="link" className="text-base">
                Track Parcel
            </Button>
            <Button variant="default" className="text-base ml-6" onClick={async () => {
                router.push("/sign-in");
            }}>
                Sign In
            </Button>
        </div>
    )
}
