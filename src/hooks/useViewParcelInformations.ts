
import { Parcel } from "@/types/supabase-table-type";
import { create } from "zustand";

type ViewParcelInformationsProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: (parcel: Parcel) => void;
  parcel?: Parcel;
};

export const useViewParcelInformations = create<ViewParcelInformationsProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: (parcel) => set({ isOpen: true, parcel }),
}));
