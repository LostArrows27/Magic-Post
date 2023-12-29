import { months } from "@/constants/month";
import { useCentralHubStat } from "@/hooks/useCentralHubStat";
import { useUser } from "@/hooks/useUser";
import { BarChartItem } from "@/types/bar-chart-item";
import { useSupabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

interface BarChartProps {
  className?: string;
}

export function CentralHubBarChart({ className }: BarChartProps) {
  const [data_bar, setData_bar] = useState<BarChartItem[]>(() => {
    return months.map((month) => {
      return {
        name: month,
        delivered: 0,
        total: 0,
        amt: 0,
      };
    });
  });

  const [loading, setLoading] = useState<boolean>(false);

  const centralhubStats = useCentralHubStat();

  const { workLocation } = useUser();

  const supabase = useSupabase();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!supabase || !workLocation?.id) return;

        // create a new Date that is start from 12 month ago from now

        const date = new Date();

        const startDate = new Date(
          date.getFullYear(),
          date.getMonth() - 12,
          date.getDate()
        );

        setLoading(true);
        const { data, error } = await supabase
          .from("transfers")
          .select("*, transfer_details(*)")
          .or(
            `from_location_id.eq.${workLocation?.id},to_location_id.eq.${workLocation?.id}`
          )
          .gte("date_transferred", startDate.toISOString());

        if (data === null) {
          setData_bar([]);
        }

        const monthsCount: Record<
          string,
          {
            total: number;
            delivered: string[];
            stash: string[];
            progress: string[];
            all: string[];
            deliveredOnly: string[];
          }
        > = {};

        let all = {
          count: 0,
          prevMonthGrow: "",
        };
        let stash = {
          count: 0,
          prevMonthGrow: "",
        };
        let progress = {
          count: 0,
          prevMonthGrow: "",
        };
        let delivered = {
          count: 0,
          prevMonthGrow: "",
        };

        data!.forEach((transfer) => {
          const transferMonth = new Date(transfer.date_transferred).getMonth();
          const isFromWorkLocation =
            transfer.from_location_id === workLocation.id;

          transfer.transfer_details.forEach((transferDetail) => {
            const parcelId = transferDetail.parcel_id;

            const monthName = months[transferMonth];

            if (!monthsCount[monthName]) {
              monthsCount[monthName] = {
                total: 0,
                delivered: [],
                deliveredOnly: [],
                stash: [],
                progress: [],
                all: [],
              };
            }

            //  haven't delivired yet to the central hub
            if (
              !(
                !transfer.has_verfied &&
                transfer.to_location_id === workLocation.id
              )
            ) {
              monthsCount[monthName].total++;
              all.count++;
            }

            if (isFromWorkLocation) {
              monthsCount[monthName].delivered.push(parcelId);
            }

            // stat count
            if (
              transfer.to_location_id === workLocation.id &&
              transfer.has_verfied
            ) {
              stash.count++;
              monthsCount[monthName].stash?.push(parcelId);
            }

            if (
              transfer.from_location_id === workLocation.id &&
              !transfer.has_verfied
            ) {
              progress.count++;
              monthsCount[monthName].progress?.push(parcelId);
            }

            if (
              transfer.from_location_id === workLocation.id &&
              transfer.has_verfied
            ) {
              delivered.count++;
              monthsCount[monthName].deliveredOnly?.push(parcelId);
            }
          });
        });

        const result = months.map((monthName) => ({
          name: monthName,
          total: monthsCount[monthName] ? monthsCount[monthName].total : 0,
          delivered: monthsCount[monthName]
            ? monthsCount[monthName].delivered.length
            : 0,
          stash: monthsCount[monthName]
            ? monthsCount[monthName].stash?.length
            : 0,

          progress: monthsCount[monthName]
            ? monthsCount[monthName].progress?.length
            : 0,
          deliveredOnly: monthsCount[monthName]
            ? monthsCount[monthName].deliveredOnly?.length
            : 0,
        }));

        result.forEach((item, index) => {
          if (index === new Date().getMonth()) {
            let lastMonth;
            if (index === 0) {
              lastMonth = result[11];
            } else {
              lastMonth = result[index - 1];
            }

            let lastMonthALl = lastMonth.total === 0 ? 1 : lastMonth.total;
            let lastMonthStash = lastMonth.stash === 0 ? 1 : lastMonth.stash;
            let lastMonthProgress =
              lastMonth.progress === 0 ? 1 : lastMonth.progress;
            let lastMonthDeliveredOnly =
              lastMonth.deliveredOnly === 0 ? 1 : lastMonth.deliveredOnly;

            all.prevMonthGrow =
              (((item.total - lastMonth.total) / lastMonthALl) * 100).toFixed(
                2
              ) + "%";
            stash.prevMonthGrow =
              (((item.stash - lastMonth.stash) / lastMonthStash) * 100).toFixed(
                2
              ) + "%";
            progress.prevMonthGrow =
              (
                ((item.progress - lastMonth.progress) / lastMonthProgress) *
                100
              ).toFixed(2) + "%";
            delivered.prevMonthGrow =
              (
                ((item.deliveredOnly - lastMonth.deliveredOnly) /
                  lastMonthDeliveredOnly) *
                100
              ).toFixed(2) + "%";
          }
        });

        centralhubStats.setAll(all);
        centralhubStats.setStash(stash);
        centralhubStats.setProgress(progress);
        centralhubStats.setDelivered(delivered);

        setData_bar(result);

        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetch();
  }, [supabase, workLocation?.id]);

  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart
        width={500}
        height={300}
        data={data_bar}
        margin={{
          top: 20,
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
        <Bar dataKey="delivered" stackId="a" fill="#8884d8" />
        <Bar dataKey="total" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
