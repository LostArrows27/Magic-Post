import { SupabaseClient } from "@supabase/supabase-js";
import { create } from "zustand";
import { Staff } from "@/types/supabase-table-type";

interface StaffStore {
  staffs: Staff[];
  isLoading: boolean;
  isError: boolean;
  fetchStaffs: (work_place_id: string, role: string, supabase: SupabaseClient) => Promise<void>;
}

export const useLocation = create<StaffStore>((set) => ({
  staffs: [],
  isLoading: false,
  isError: false,
  fetchStaffs: async (work_place_id: string, role: string, supabase: SupabaseClient) => {
    set({ isLoading: true, isError: false });
    try {
      const { data, error } = await supabase
        .from("staffs")
        .select("*")
        .match({"work_place_id": work_place_id, "role": role});
        console.log(data);

      if (error) {
        throw error;
      }

      set({ staffs: data ?? [], isLoading: false });
    } catch (error) {
      console.error('Error fetching locations:', error);
      set({ isLoading: false, isError: true });
    }
  },
}));
