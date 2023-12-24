import { TransferWithParcelData } from "@/types/supabase-table-type";
import { create } from "zustand";

type AllTransferState = {
  allTransfer: TransferWithParcelData[];
  setAllTransfer: (allTransfer: TransferWithParcelData[]) => void;
};

export const useAllTransfer = create<AllTransferState>((set) => ({
  allTransfer: [],
  setAllTransfer: (allTransfer) => set({ allTransfer }),
}));
