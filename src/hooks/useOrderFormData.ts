import { Customer } from "@/types/supabase-table-type";
import { create } from "zustand";

type OrderFormData = {
  sender?: Customer;
  receiver?: Customer;
  setSender: (sender: Customer) => void;
  setReceiver: (receiver: Customer) => void;
};

export const useOrderFormData = create<OrderFormData>((set) => ({
  sender: undefined,
  receiver: undefined,
  setSender: (sender) => set({ sender }),
  setReceiver: (receiver) => set({ receiver }),
}));
