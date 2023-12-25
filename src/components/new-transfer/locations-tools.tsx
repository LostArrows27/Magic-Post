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
import { useTransferLocations } from "@/hooks/useTransferLocations";
type Filters = "amount" | ''
export default function LocationsTools() {
  const { locations, displayLocations, setDisplayLocations } = useTransferLocations();
  const [minFirst, setMinFirst] = useState(true);
  const router = useRouter();
  const [filter, setFilter] = useState<Filters>(''); // ["weight","fee","time"
  useEffect(() => {
    if (filter) {
      // sort by filter if minfirst then asc else desc
      const sorted = displayLocations.sort((a, b) => {
       
          return minFirst ? a.count_parcels - b.count_parcels : b.count_parcels - a.count_parcels;
        
      });
      setDisplayLocations(sorted);
    }
  }, [filter, minFirst]);
  return (
    <div className="flex gap-x-3">
      <Button
        onClick={() => {
          router.refresh();
          setMinFirst(true);
          setFilter('');
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
        <SelectTrigger  className="w-[180px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Choose filter"  />
        </SelectTrigger>
        <SelectContent className="bg-primary text-primary-foreground">
          <SelectItem value="amount">Amount</SelectItem>
         
        </SelectContent>
      </Select>
    </div>
  );
}
