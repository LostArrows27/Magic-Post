import { SupabaseClient } from "@supabase/supabase-js";
import { create } from "zustand";
import { Location } from "@/types/supabase-table-type";

// export type Location = {
//   id: number;
//   name: string;
//   type: string;
//   manager_id: string;
//   province_id: string;
//   district_id: string;
//   // Add other properties as needed
// }

interface LocationStore {
  locations: Location[];
  isLoading: boolean;
  isError: boolean;
  fetchLocations: (type: string, supabase: SupabaseClient) => Promise<void>;
}

export const useLocation = create<LocationStore>((set) => ({
  locations: [],
  isLoading: false,
  isError: false,
  fetchLocations: async (type: string, supabase: SupabaseClient) => {
    set({ isLoading: true, isError: false });
    try {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .eq("type", type);
        console.log(data);

      if (error) {
        throw error;
      }

      set({ locations: data ?? [], isLoading: false });
    } catch (error) {
      console.error('Error fetching locations:', error);
      set({ isLoading: false, isError: true });
    }
  },
}));
