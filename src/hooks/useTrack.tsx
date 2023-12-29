import { SupabaseClient } from "@supabase/supabase-js";
import { create } from "zustand";
import {
  Customer,
  Location,
  Parcel,
  Tracking,
} from "@/types/supabase-table-type";
import { toast } from "sonner";
import { Database } from "@/types/supabase-type";
import { getEstimatePrice } from "@/actions/get-estimate-price";

type TrackingWithLocation = Tracking & {
  locations: Location;
};

type TracksData = Parcel & {
  trackings: TrackingWithLocation[];
  sender: Customer;
  receiver: Customer;
};
interface TrackStore {
  tracks?: TracksData;
  isLoading: boolean;
  estimatePrice?: string;
  isError: boolean;
  fetchTracks: (
    supabase: SupabaseClient<Database, "public">,
    parcel_id: string
  ) => Promise<void>;
}

export const useTrack = create<TrackStore>((set) => ({
  isLoading: false,
  isError: false,
  fetchTracks: async (supabase: SupabaseClient, parcel_id: string) => {
    set({ isLoading: true, isError: false });
    try {
      // convert getTime from create time to number

      const getTime = parseInt(parcel_id);

      if (isNaN(getTime)) {
        throw new Error("Parcel ID is not valid");
      }

      const queryByTime = new Date(getTime).toISOString();

      let { data, error } = (await supabase
        .from("parcels")
        .select(
          "*, trackings(*, locations(*)), receiver:customers!parcels_receiver_id_fkey(*), sender:customers!parcels_sender_id_fkey(*)"
        )
        .eq("date_sent", queryByTime)
        .returns<TracksData>()
        .single()) as never as {
        data: TracksData | undefined;
        error: any;
      };

      if (error) {
        console.log(error);
        throw new Error("Parcel ID is not valid");
      }

      let estimatePrice = "";

      if (data) {
        estimatePrice = await getEstimatePrice(
          data.sender.address_meta_data.province.PROVINCE_ID + "",
          data.sender.address_meta_data.district.DISTRICT_ID + "",
          data.receiver.address_meta_data.province.PROVINCE_ID + "",
          data.receiver.address_meta_data.district.DISTRICT_ID + "",
          data.weight
        );
      }

      // sort trackings by date desc

      if (data?.trackings) {
        data.trackings.sort((a, b) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
      }

      set({
        tracks: (data as TracksData) ?? [],
        isLoading: false,
        estimatePrice: estimatePrice ?? "",
      });
    } catch (error: any) {
      toast.error(error.message);
      set({ isLoading: false, isError: true });
    }
  },
}));
