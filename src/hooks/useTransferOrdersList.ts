import { Parcel } from "@/types/supabase-table-type";
import { create } from "zustand";

type TransferOrdersList = {
    orders: (Parcel & { checked: boolean })[];
    displayOrders: (Parcel & { checked: boolean })[];

    totalWeight: number;
    totalFee: number;
    setOrders: (orders: (Parcel & { checked: boolean })[]) => void;
    setDisplayOrders: (orders: (Parcel & { checked: boolean })[]) => void;
    setTotalWeight: (totalWeight: number) => void;
    setTotalFee: (totalFee: number) => void;

};

export const useTransferOrdersList = create<TransferOrdersList>((set) => ({
    orders: [],
    displayOrders: [],
    totalWeight: 0,
    totalFee: 0,
    setTotalFee: (totalFee) => set({ totalFee }),
    setDisplayOrders: (displayOrders) => set({ displayOrders }),
    setTotalWeight: (totalWeight) => set({ totalWeight }),
    setOrders: (orders) => set({ orders }),
}));
