"use client";

import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import StatisticsDisplay from "./statistics-display";

export default function StatisticsDetail() {
  const { userDetails } = useUser();

  let work_place_type =
    userDetails?.role === "tk_admin" ? "tap_ket" : "giao_dich";

  return (
    <>
      <div className={cn(`space-y-4 fade-in mt-4`)}>
        {/* Hub name */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">
              {work_place_type === "tap_ket" ? (
                <>Central Hub: {userDetails?.work_place_id}</>
              ) : (
                <>Hub: {userDetails?.work_place_id}</>
              )}
            </h3>
          </div>
        </div>
        <div>
          <div className="flex flex-col mt-8">
            <StatisticsDisplay
              work_place_id={userDetails?.work_place_id}
              work_place_type={work_place_type}
            />
          </div>
        </div>
      </div>
    </>
  );
}
