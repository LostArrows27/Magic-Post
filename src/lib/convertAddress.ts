import { AddressMetaData } from "@/types/supabase-table-type";

export function convertAddress(address: AddressMetaData) {
  let result = " ";

  if (address.subward) {
    result += address.subward.name;
  }

  if (address.ward) {
    result += ", " + address.ward.WARDS_NAME + ", ";
  }

  result +=
    address.province.PROVINCE_NAME + ", " + address.district.DISTRICT_NAME;

  return result;
}
