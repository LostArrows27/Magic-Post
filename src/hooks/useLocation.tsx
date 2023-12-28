import { SupabaseClient } from "@supabase/supabase-js";
import { create } from "zustand";
import { Staff } from "@/types/supabase-table-type";

export type LocationAndManager = {
  created_at: string;
  district_id: number | null;
  district_meta_data: {};
  id: string;
  manager_id: string;
  province_id: number;
  province_meta_data: {
    PROVINCE_CODE: string;
    PROVINCE_ID: number;
    PROVINCE_NAME: string;
    VALUE: string;
  };
  type: "tap_ket" | "giao_dich";
  staffs: Staff;
  // Add other properties as needed
};

interface LocationStore {
  locations: LocationAndManager[];
  isLoading: boolean;
  isError: boolean;
  setLocations: (locations: LocationAndManager[]) => void;
  fetchLocations: (type: string, supabase: SupabaseClient) => Promise<void>;
}

export const useLocation = create<LocationStore>((set) => ({
  locations: [],
  isLoading: false,
  isError: false,
  setLocations: (locations: LocationAndManager[]) => set({ locations }),
  fetchLocations: async (type: string, supabase: SupabaseClient) => {
    set({ isLoading: true, isError: false });
    try {
      const { data, error } = await supabase
        .from("locations")
        .select("*, staffs!locations_manager_id_fkey(*)")
        .eq("type", type);
      //console.log(data);

      if (error) {
        throw error;
      }

      set({ locations: data ?? [], isLoading: false });
    } catch (error) {
      console.error("Error fetching locations:", error);
      set({ isLoading: false, isError: true });
    }
  },
}));
