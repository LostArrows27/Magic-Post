"use client";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useStaff } from "@/hooks/useStaff";
import { Button } from "../ui/button";
import { OverviewCard } from "../dashboard/overview-card";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { CentralHubBarChart } from "./central-hub-bar-chart";
import { HubLineChart } from "./hub-line-chart";

// data tam thoi
import { HubItems } from "@/constants/hub-card";
import { data_bar } from "@/constants/bar-chart";
import { data_line_hub } from "@/constants/line-chart";
import { OverviewCardCentralHub } from "../overview-card-central-hub/overview-card-centralhub";
// data tam thoi

export default function StatisticsDisplay({
  work_place_id,
  work_place_type,
}: {
  work_place_id: string | null | undefined;
  work_place_type: string;
}) {
  let role = work_place_type === "tap_ket" ? "tk_staff" : "gd_staff";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold tracking-tight ml-3">
          Statistics
        </h4>
        <Button variant="default" className="text-sm font-bold tracking-tight">
          Download
        </Button>
      </div>
      {role === "tk_staff" ? (
        <OverviewCardCentralHub />
      ) : (
        <OverviewCard items={HubItems} />
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Overview Line Chart */}
        <Card className="col-span-5 bg-neutral-100">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {work_place_type === "tap_ket" ? (
              <CentralHubBarChart />
            ) : (
              <HubLineChart />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
