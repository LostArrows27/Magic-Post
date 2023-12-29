"use client";
import { LineChartItem } from "@/types/line-chart-item";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface OverviewLineChartProps {
  className?: string;
}
// import { LineChartItem } from "@/types/line-chart-item";
import { data_line_overview } from "@/constants/line-chart";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useSupabase } from "@/utils/supabaseClient";
import { toast } from "sonner";
import { months, week } from "@/constants/month";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function OverviewLineChart({ className }: OverviewLineChartProps) {
  const [data, setData] = useState<LineChartItem[]>([]);
  const [filter, setFilter] = useState<"week" | "year">("week");
  const supabaseClient = useSupabase();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      let date = new Date();
      let initialData: any[] = [];
      if (filter === "year") {
        date.setFullYear(date.getFullYear() - 1);
        initialData = months.map((month) => {
          return {
            name: month,
            delivered: 0,
            failed: 0,
            progress: 0,
            total: 0,
          };
        });
      } else {
        date.setDate(date.getDate() - 7);
        initialData = week.map((day) => {
          return {
            name: day,
            delivered: 0,
            failed: 0,
            progress: 0,
            total: 0,
          };
        });
      }

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

      if (deliverdError || failedError) {
        toast.error(deliverdError?.message || failedError?.message);
        return;
      }

      delivered?.forEach((par) => {
        const parDate = new Date(par.date_sent);
        const parMonth = parDate.getMonth();
        const parDay = parDate.getDay();
        if (filter === "year") {
          initialData[parMonth].delivered += 1;
        } else {
          initialData[parDay].delivered += 1;
        }
      });
      failed?.forEach((par) => {
        const parDate = new Date(par.date_sent);
        const parMonth = parDate.getMonth();
        const parDay = parDate.getDay();
        if (filter === "year") {
          initialData[parMonth].failed += 1;
        } else {
          initialData[parDay].failed += 1;
        }
      });
      totalData?.forEach((par) => {
        const parDate = new Date(par.date_sent);
        const parMonth = parDate.getMonth();
        const parDay = parDate.getDay();
        if (filter === "year") {
          initialData[parMonth].total += 1;
        } else {
          initialData[parDay].total += 1;
        }
      });
      progressData?.forEach((par) => {
        const parDate = new Date(par.date_sent);
        const parMonth = parDate.getMonth();
        const parDay = parDate.getDay();
        if (filter === "year") {
          initialData[parMonth].progress += 1;
        } else {
          initialData[parDay].progress += 1;
        }
      });

      setData(initialData);
      setLoading(false);
    })();
  }, [filter]);
  return (
    <div className="w-full relative">
      {!loading ? (
        <>
          <ResponsiveContainer width="100%" height={450}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#E1C16E"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="delivered"
                stroke="#22c35e"
                activeDot={{ r: 8 }}
              />

              <Line
                type="monotone"
                dataKey="progress"
                stroke="#0047AB"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="failed"
                stroke="#ec4547"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <Select
            value={filter}
            onValueChange={(value) => {
              setFilter(value as "week" | "year");
            }}
          >
            <SelectTrigger className="w-[150px] bg-primary text-primary-foreground absolute right-0 -top-14  ">
              <SelectValue placeholder="Choose filter" />
            </SelectTrigger>
            <SelectContent className="bg-primary text-primary-foreground">
              <SelectItem value={"week"}>Week</SelectItem>
              <SelectItem value={"year"}>Year</SelectItem>
            </SelectContent>
          </Select>
        </>
      ) : (
        <div className="w-full h-[450px] flex items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin h-10 w-10 text-primary" />
        </div>
      )}
    </div>
  );
}
