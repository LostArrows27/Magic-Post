import { TransferWithParcelData } from "@/types/supabase-table-type";
import { create } from "zustand";

type ViewTransferModalState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: (transfer: TransferWithParcelData) => void;
  transfer?: TransferWithParcelData;
};

export const useViewTransferModal = create<ViewTransferModalState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: (transfer) => set({ isOpen: true, transfer }),
}));
