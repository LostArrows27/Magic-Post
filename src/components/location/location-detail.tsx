"use client"

import { useLocationDetail } from "@/hooks/useLocationDetail";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { link } from "fs";

export default function LocationDetail() {
  const { isOpen, onClose, manager, hub_id, hub_type } = useLocationDetail((set) => set);

  return (
    <>
        <div className={cn(
            `space-y-4 fade-in mt-8`,
            isOpen ? "" : "hidden"
        )}>
            {/* Hub name */}
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight">
                        {hub_type === "tap_ket" ? (
                            <>Central Hub: {hub_id}</>
                        ) : (
                            <>Hub: {hub_id}</>
                        )}
                    </h3>
                </div>
                <Button variant="link" onClick={() => {onClose();}} className="text-xl font-bold tracking-tight">
                    ← Back to list
                </Button>
            </div>
            <p>blahblahblah</p>
        </div>
    </>
  );
};
