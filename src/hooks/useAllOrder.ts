import { Parcel } from "@/types/supabase-table-type";
import { create } from "zustand";

type AllOrder = {
  allOrder: Parcel[];
  setAllOrder: (allOrder: Parcel[]) => void;
  allOrderOriginData: Parcel[];
  setAllOrderOriginData: (allOrderOriginData: Parcel[]) => void;
};

export const useAllOrder = create<AllOrder>((set) => ({
  allOrder: [],
  setAllOrder: (allOrder) => set({ allOrder }),
  allOrderOriginData: [],
  setAllOrderOriginData: (allOrderOriginData) => set({ allOrderOriginData }),
}));
