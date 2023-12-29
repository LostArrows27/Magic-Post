import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CentralHubStat, useCentralHubStat } from "@/hooks/useCentralHubStat";
import { Fragment } from "react";
import { Info } from "lucide-react";

const OverviewItems = [
  {
    title: "Orders",
    type: "total",
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
    title: "Orders in progress",
    type: "progress",
    icon: Info,
    fluctuate: "+8,05% vs last monnth",
    color: "",
  },
  {
    title: "Orders in stash",
    type: "stash",
    icon: Info,
    fluctuate: "-25% vs last monnth",
    color: "",
  },
];

interface SideNavProps {
  className?: string;
}

export function OverviewCardCentralHub({ className }: SideNavProps) {
  const centralhubStat = useCentralHubStat();

  const convertStat = (type: string, stat: CentralHubStat) => {
    switch (type) {
      case "total":
        return stat.all;
      case "delivered":
        return stat.delivered;
      case "progress":
        return stat.progress;
      case "stash":
        return stat.stash;
      default:
        return stat.all;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {OverviewItems.map((item) => {
        const stat = convertStat(item.type, centralhubStat);

        return (
          <Card key={item.title} className="bg-neutral-100">
            <CardHeader className="flex flex-row gap-2 items-center justify-start space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <item.icon className={cn("h-4 w-4 cursor-pointer", item.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
              <p className="text-xs text-muted-foreground">
                {stat.prevMonthGrow.includes("-")
                  ? stat.prevMonthGrow
                  : "+" + stat.prevMonthGrow}{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
