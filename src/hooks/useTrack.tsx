import { SupabaseClient } from "@supabase/supabase-js";
import { create } from "zustand";
import { Tracking } from "@/types/supabase-table-type";

interface TrackStore {
  tracks: Tracking[];
  isLoading: boolean;
  isError: boolean;
  fetchTracks: (supabase: SupabaseClient, parcel_id: string) => Promise<void>;
}

export const useTrack = create<TrackStore>((set) => ({
  tracks: [],
  isLoading: false,
  isError: false,
  fetchTracks: async (supabase: SupabaseClient, parcel_id: string) => {
    set({ isLoading: true, isError: false });
    try {
      const { data, error } = await supabase
        .from("trackings")
        .select("*")
        .eq("parcel_id", parcel_id);

      console.log(data);

      if (error) {
        throw error;
      }

      set({ tracks: data ?? [], isLoading: false });
    } catch (error) {
      console.error('Error fetching tracks:', error);
      set({ isLoading: false, isError: true });
    }
  },
}));
