"use client";

import { ArrowBigDownDash, ArrowBigUpDash, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useTransferOrdersList } from "@/hooks/useTransferOrdersList";
import { useRouter } from "next/navigation";
type Filters = "weight" | "fee" | "time" | undefined;
export default function OrdersTools() {
  const { orders, displayOrders, setDisplayOrders } = useTransferOrdersList();
  const [minFirst, setMinFirst] = useState(true);
  const router = useRouter();
  const [filter, setFilter] = useState<Filters>(); // ["weight","fee","time"
  useEffect(() => {
    if (filter) {
      // sort by filter if minfirst then asc else desc
      const sorted = displayOrders.sort((a, b) => {
        if (filter === "weight") {
          return minFirst ? a.weight - b.weight : b.weight - a.weight;
        } else if (filter === "fee") {
          return minFirst ? a.paid_fee - b.paid_fee : b.paid_fee - a.paid_fee;
        } else {
          return minFirst
            ? new Date(a.date_sent).getMilliseconds() -
                new Date(b.date_sent).getMilliseconds()
            : new Date(b.date_sent).getMilliseconds() -
                new Date(a.date_sent).getMilliseconds();
        }
      });
      setDisplayOrders(sorted);
    }
  }, [filter, minFirst]);
  return (
    <div className="flex gap-x-3">
      <Button
        onClick={() => {
          router.refresh();
          setMinFirst(true);
          setFilter(undefined);
        }}
        size={"icon"}
      >
        <RefreshCw />
      </Button>
      <Button
        onClick={() => {
          setMinFirst(!minFirst);
        }}
        size={"icon"}
      >
        {minFirst ? <ArrowBigUpDash /> : <ArrowBigDownDash />}
      </Button>
      <Select
        onValueChange={(value) => {
          setFilter(value as Filters);
        }}
        value={filter}
      >
        <SelectTrigger className="w-[180px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Choose filter" />
        </SelectTrigger>
        <SelectContent className="bg-primary text-primary-foreground">
          <SelectItem value="weight">Weight</SelectItem>
          <SelectItem value="fee">Fee</SelectItem>
          <SelectItem value="time">Time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
