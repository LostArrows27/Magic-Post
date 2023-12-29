import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OverviewLineChart } from "@/components/statistics/overview-line-chart";
import { OverviewCard } from "@/components/dashboard/overview-card";
import { OverviewItems } from "@/constants/overview-card";
import { OverviewPieChart } from "@/components/dashboard/overview-piechart";
import NewLocationButton from "@/components/dashboard/new-location-button";
import { supabaseServer } from "@/utils/supabaseServer";
import { OverviewItem } from "@/types/overview-item";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Master dashboard",
};

export default async function DashboardPage() {
  let date = new Date();
  date.setFullYear(date.getFullYear() - 1);

  const supabaseClient = supabaseServer();
  const { data: delivered, error: deliverdError } = await supabaseClient
    .from("parcels")
    .select("id, date_sent")
    .eq("state", "đã giao")
    .gte("date_sent", date.toISOString())
    .order("date_sent", { ascending: false });
  const { data: totalData } = await supabaseClient
    .from("parcels")
    .select("id, date_sent")
    .gte("date_sent", date.toISOString())
    .order("date_sent", { ascending: false });
  const { data: failed, error: failedError } = await supabaseClient
    .from("parcels")
    .select("id, date_sent")
    .eq("state", "đã trả lại điểm giao dịch đích")
    .gte("date_sent", date.toISOString())
    .order("date_sent", { ascending: false });
  const { data: progressData } = await supabaseClient
    .from("parcels")
    .select("id, date_sent")
    .in("state", [
      "đã nhận từ khách hàng",
      "đang chuyển đến điểm tập kết gửi",
      "đã nhận từ điểm giao dịch gửi",
      "đang chuyển đến điểm tập kết đích",
      "đã nhận từ điểm tập kết gửi",
      "đang chuyển đến điểm giao dịch đích",
      "đã nhận từ điểm tập kết đích",
      "sẵn sàng giao hàng",
    ])
    .gte("date_sent", date.toISOString())
    .order("date_sent", { ascending: false });

  const overViewData: OverviewItem[] = OverviewItems.map((item) => {
    switch (item.title) {
      case "Orders":
        return {
          ...item,
          content: totalData?.length,
        };
      case "Orders delivered":
        return {
          ...item,
          content: delivered?.length,
        };
      case "Orders in progress":
        return {
          ...item,
          content: progressData?.length,
        };
      case "Orders failed":
        return {
          ...item,
          content: failed?.length,
        };
      default:
        return item;
    }
  }) as OverviewItem[];

  return (
    <>
      <div className="hidden flex-col md:flex fade-in">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <NewLocationButton />
            </div>
          </div>
          <div defaultValue="overview" className="space-y-4">
            <div className="space-y-4">
              {/* Overview Card */}
              <OverviewCard items={overViewData} />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Overview Line Chart */}
                <Card className="col-span-5 bg-neutral-100">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <OverviewLineChart />
                  </CardContent>
                </Card>

                {/* User chart */}
                <Card className="col-span-2 bg-neutral-100">
                  <CardHeader>
                    <CardTitle>Customers</CardTitle>
                    <CardDescription>
                      Information about your customer.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <p className="font-semibold">New Customer</p>
                        <p className="text-green-500">50%</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold">Retargeted Customer</p>
                        <p className="text-blue-500">50%</p>
                      </div>
                    </div>
                    <OverviewPieChart />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
