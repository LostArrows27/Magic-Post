
import { Parcel } from "@/types/supabase-table-type";
import {create} from "zustand";
export type TransferState  = "gd=>tk" | "tk=>tk" | "tk=>gd"  |null;
type TransferConfirmModalProps = {
  state: TransferState;
  seleted: (Parcel & { checked: boolean })[];
  totalWeight:number;
  totalFee:number;
  isOpen: boolean;
  onOpen: (state: TransferState, seleted:(Parcel & { checked: boolean })[], totalWeight: number, totalFee:number ) => void;
  onClose: () => void;
  reset: () => void;
};

const initialValue = {
  isOpen: false,
  state: null,
  seleted:[],
  totalWeight:0,
  totalFee:0,
};

export const useTransferConfirmModal = create<TransferConfirmModalProps>((set) => ({
    ...initialValue,
    onOpen: (state, seleted, totalWeight, totalFee) => set({ isOpen: true, state, seleted, totalWeight, totalFee }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initialValue }),
})
);
