import { District, Province, Subward, Ward } from "./geometry-type";
import { Database } from "./supabase-type";
// Enum

export type Role = Database["public"]["Enums"]["role"];
export type Building = Database["public"]["Enums"]["building"];
export type Gender = Database["public"]["Enums"]["gender"];
export type ParcelStatus = Database["public"]["Enums"]["parcel_status"];

// Table

export type Staff = Database["public"]["Tables"]["staffs"]["Row"];
export type Location = Database["public"]["Tables"]["locations"]["Row"];
export type Parcel = Database["public"]["Tables"]["parcels"]["Row"];
export type Tracking = Database["public"]["Tables"]["trackings"]["Row"];
export type TransferDetail =
  Database["public"]["Tables"]["transfer_details"]["Row"];

export type Customer = Omit<
  Database["public"]["Tables"]["customers"]["Row"],
  "address_meta_data"
> & {
  address_meta_data: {
    province: Province;
    district: District;
    ward: Ward;
    subward: Subward;
  };
};
