import { create } from "zustand";

interface ParcelIdStore {
  parcelId: string;
  setParcelId: (id: string) => void;
}

export const useParcelId = create<ParcelIdStore>((set) => ({
  parcelId: '',
  setParcelId: (id) => set({ parcelId: id }),
}));
