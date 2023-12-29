import { OverviewItem } from "@/types/overview-item";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

interface SideNavProps {
  items: OverviewItem[];
  className?: string;
}

export function OverviewCard({ items, className }: SideNavProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const color = `text-[${item.color}]`;
        return (
          <Card key={item.title} className="bg-neutral-100">
            <CardHeader className="flex flex-row gap-2 items-center justify-start space-y-0 pb-2">
              <CardTitle className={cn("text-sm font-medium")}>
                {item.title}
              </CardTitle>
              <item.icon
                className={cn(
                  "h-4 w-4 cursor-pointer",
                  item.title === "Orders"
                    ? "text-[#E1C16E]"
                    : item.title === "Orders delivered"
                    ? "text-[#22c35e]"
                    : item.title === "Orders in progress"
                    ? "text-[#0047AB]"
                    : "text-[#ec4547]"
                )}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.content}</div>
              {/* <p className="text-xs text-muted-foreground">
                      {item.fluctuate}
                    </p> */}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
