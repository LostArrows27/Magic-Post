import { Location } from "@/types/supabase-table-type";

export function convertLocationToString(location: Location) {
  if (location.type === "giao_dich") {
    return (
      location.district_meta_data.DISTRICT_NAME +
      ", " +
      location.province_meta_data.PROVINCE_NAME
    );
  } else {
    return location.province_meta_data.PROVINCE_NAME;
  }
}
