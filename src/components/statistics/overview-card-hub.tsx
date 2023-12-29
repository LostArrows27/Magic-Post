import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CentralHubStat, useCentralHubStat } from "@/hooks/useCentralHubStat";
import { Fragment, useEffect, useState } from "react";
import { Info } from "lucide-react";
import { useHubLineChart } from "@/hooks/useHubLineChart";

const OverviewItems = [
  {
    title: "Orders stored",
    type: "stored",
    icon: Info,
    fluctuate: "+25% from last monnth",
    color: "",
  },
  {
    title: "Orders delivered",
    type: "delivered",
    icon: Info,
    fluctuate: "+75% from last monnth",
    color: "",
  },
  {
    title: "Orders delivering",
    type: "delivering",
    icon: Info,
    fluctuate: "+8,05% vs last monnth",
    color: "",
  },
];

interface SideNavProps {
  className?: string;
}
interface hubLineChartItem {
    name?: string;
    stored?: number;
    delivered?: number;
    delivering?: number;
  }
export function OverviewCardHub({ className }: SideNavProps) {
 const {delivered, delivering, stored} = useHubLineChart();

 
  return (
    <div className="grid gap-4 grid-cols-3">
      {OverviewItems.map((item) => {
        const stat = item.type === "stored" ? stored : item.type === "delivered" ? delivered : delivering;

        return (
          <Card key={item.title} className="bg-neutral-100">
            <CardHeader className="flex flex-row gap-2 items-center justify-start space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className={cn("h-4 w-4 cursor-pointer", item.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat}</div>
              
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
