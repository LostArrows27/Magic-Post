import { District, Province, Subward, Ward } from "./geometry-type";
import { Tables, Enums } from "./supabase-type";
// Enum

export type Role = Enums<"role">;
export type Building = Enums<"building">;
export type Gender = Enums<"gender">;
export type ParcelStatus = Enums<"parcel_status">;

// Table

export type Staff = Tables<"staffs">;

export type Parcel = Tables<"parcels">;
export type Tracking = Tables<"trackings">;
export type TransferDetail = Tables<"transfer_details">;
export type Transfers = Tables<"transfers">;

export type Customer = Omit<Tables<"customers">, "address_meta_data"> & {
  address_meta_data: {
    province: Province;
    district: District;
    ward: Ward;
    subward: Subward;
  };
};

export type Location = Omit<
  Tables<"locations">,
  "province_meta_data" | "district_meta_data"
> & {
  province_meta_data: Province;
  district_meta_data: District;
};

export type StaffData = Staff & {
  locations: Location;
};

export type TransferDetailWithParcel = TransferDetail & {
  parcels: Parcel;
};

export type TransferWithParcelData = Transfers & {
  transfer_details: TransferDetailWithParcel[];
};
