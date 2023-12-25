"use client";

import { TransferWithParcelData } from "@/types/supabase-table-type";
import FilterTransfer from "./FilterTransfer";
import TransferDetailTable from "./TransferDetailTable";
import { useAllTransfer } from "@/hooks/useAllTransfer";
import { useEffect } from "react";
import { Separator } from "../ui/separator";

const AllTransfers = ({
  transfers,
}: {
  transfers: TransferWithParcelData[];
}) => {
  const { setAllTransfer, setAllTransferOriginData } = useAllTransfer(
    (state) => ({
      setAllTransfer: state.setAllTransfer,
      setAllTransferOriginData: state.setAllTransferOriginData,
    })
  );

  useEffect(() => {
    setAllTransfer(transfers);
    setAllTransferOriginData(transfers);
  }, [setAllTransfer, setAllTransferOriginData, transfers]);

  return (
    <div className="p-5">
      <FilterTransfer />
      <Separator className="w-full h-1 mt-6 bg-amber-200" />
      <TransferDetailTable />
    </div>
  );
};

export default AllTransfers;
