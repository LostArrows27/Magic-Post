import { data_line_hub } from "@/constants/line-chart";
import { LineChartItem } from "@/types/line-chart-item";
import { useSupabase } from "@/utils/supabaseClient";
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
import { useUser } from "@/hooks/useUser";
import { months, week } from "@/constants/month";
import { toast } from "sonner";
import { useHubLineChart } from "@/hooks/useHubLineChart";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
interface LineChartProps {
  className?: string;
}

interface hubLineChartItem {
  name?: string;
  stored?: number;
  delivered?: number;
  delivering?: number;
}
export function HubLineChart({ className }: LineChartProps) {
  const { setDelivered, setDelivering, setStored } = useHubLineChart();
  const [data, setData] = useState<hubLineChartItem[]>([]);
  const [filter, setFilter] = useState<"week" | "year">("week");
  const supabaseClient = useSupabase();
  const [loading, setLoading] = useState(false);
  const { userDetails } = useUser();
  useEffect(() => {
    if (!userDetails) return;
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
            stored: 0,
            delivering: 0,
          };
        });
      } else {
        date.setDate(date.getDate() - 7);
        initialData = week.map((day) => {
          return {
            name: day,
            delivered: 0,
            stored: 0,
            delivering: 0,
          };
        });
      }

      const { data: delivered, error: deliverdError } = await supabaseClient
        .from("parcels")
        .select("id, date_sent")
        .eq("origin_location_id", userDetails!.work_place_id as string)
        .neq("current_location_id", userDetails!.work_place_id as string)
        .gte("date_sent", date.toISOString())
        .order("date_sent", { ascending: false });

      const { data: delivered2, error: deliverd2Error } = await supabaseClient
        .from("parcels")
        .select("id, date_sent")
        .eq("current_location_id", userDetails!.work_place_id as string)
        .eq("state", "đã giao")
        .gte("date_sent", date.toISOString())
        .order("date_sent", { ascending: false });

      const { data: stored, error: storedError } = await supabaseClient
        .from("parcels")
        .select("id, date_sent")
        .eq("current_location_id", userDetails!.work_place_id as string)
        .in("state", [
          "đã nhận từ khách hàng",
          "đã nhận từ điểm tập kết đích",
          "sẵn sàng giao hàng",
        ])
        .gte("date_sent", date.toISOString())
        .order("date_sent", { ascending: false });

      const { data: delivering, error: deliveringError } = await supabaseClient
        .from("parcels")
        .select("id, date_sent")
        .eq("current_location_id", userDetails!.work_place_id as string)
        .in("state", ["đang chuyển đến điểm tập kết gửi"])
        .gte("date_sent", date.toISOString())
        .order("date_sent", { ascending: false });

      if (deliverdError || deliveringError || storedError || deliverd2Error) {
        toast.error(
          deliverdError?.message ||
            deliveringError?.message ||
            storedError?.message ||
            deliverd2Error?.message
        );
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

      stored?.forEach((par) => {
        const parDate = new Date(par.date_sent);
        const parMonth = parDate.getMonth();
        const parDay = parDate.getDay();
        if (filter === "year") {
          initialData[parMonth].stored += 1;
        } else {
          initialData[parDay].stored += 1;
        }
      });
      delivering?.forEach((par) => {
        const parDate = new Date(par.date_sent);
        const parMonth = parDate.getMonth();
        const parDay = parDate.getDay();
        if (filter === "year") {
          initialData[parMonth].delivering += 1;
        } else {
          initialData[parDay].delivering += 1;
        }
      });

      delivered2?.forEach((par) => {
        const parDate = new Date(par.date_sent);
        const parMonth = parDate.getMonth();
        const parDay = parDate.getDay();
        if (filter === "year") {
          initialData[parMonth].delivered += 1;
        } else {
          initialData[parDay].delivered += 1;
        }
      });

      setDelivered(delivered.length + delivered2.length);
      setDelivering(delivering.length);
      setStored(stored.length);
      setData(initialData);
      setLoading(false);
    })();
  }, [filter]);
  return (
    <div className="w-full h-[450px] relative">
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
                dataKey="stored"
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
                dataKey="delivering"
                stroke="#0047AB"
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
