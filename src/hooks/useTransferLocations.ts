import { Location } from "@/types/supabase-table-type";
import { create } from "zustand";
export type TransferLocations = (Location & { count_parcels: number })[];
type TransferLocationsProps = {
    locations: TransferLocations;
    displayLocations: TransferLocations;
    selectedLocation: Location | null;
    setSelectedLocation: (location: Location | null) => void;
    setLocations: (locations: TransferLocations ) => void;
    setDisplayLocations: (locations: TransferLocations ) => void;
};

export const useTransferLocations = create<TransferLocationsProps>((set) => ({
    locations: [],
    displayLocations: [],
    selectedLocation: null,
    setSelectedLocation: (selectedLocation) => set({ selectedLocation }),
    setDisplayLocations: (displayLocations) => set({ displayLocations }),
    setLocations: (locations) => set({ locations }),
}));
