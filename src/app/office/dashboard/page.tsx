import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OverviewLineChart } from "@/components/dashboard/overview-linechart";
import { OverviewCard } from "@/components/dashboard/overview-card";
import { OverviewItems } from "@/constants/overview-card";
import { OverviewPieChart } from "@/components/dashboard/overview-piechart";
import NewLocationButton from "@/components/dashboard/new-location-button";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Master dashboard",
};

export default function DashboardPage() {
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
            {/* Tab List */}
            {/* Tab content */}
            <div className="space-y-4">
              {/* Overview Card */}
              <OverviewCard items={OverviewItems} />
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
