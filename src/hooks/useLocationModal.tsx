import { Staff } from "@/types/supabase-table-type";
import { create } from "zustand";

type LocationModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  reset: () => void;
};

const initialValue = {
  isOpen: false,
};

export const useLocationModal = create<LocationModalProps>((set) => ({
  ...initialValue,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initialValue }),
}));