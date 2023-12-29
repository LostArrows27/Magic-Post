"use client";

import { useAllOrder } from "@/hooks/useAllOrder";
import { Separator } from "../ui/separator";
import FilterOrder from "./FilterOrder";
import OrderDetailTable from "./OrderDetailTable";
import { useEffect } from "react";
import { Parcel } from "@/types/supabase-table-type";

const AllOrders = ({ parcel }: { parcel: Parcel[] }) => {
  const { setAllOrder, setAllOrderOriginData } = useAllOrder((state) => ({
    setAllOrder: state.setAllOrder,
    setAllOrderOriginData: state.setAllOrderOriginData,
  }));

  useEffect(() => {
    setAllOrderOriginData(parcel);
    setAllOrder(parcel);
  }, [parcel, setAllOrder, setAllOrderOriginData]);

  return (
    <div className="p-5">
      <FilterOrder />
      <Separator className="w-full h-1 mt-6 bg-amber-200" />
      <OrderDetailTable />
    </div>
  );
};

export default AllOrders;
