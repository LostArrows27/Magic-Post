import { viettelAPI } from "@/services/config";
import { District } from "@/types/geometry-type";

export async function getAllDistrictList() {
  const { data } = (await viettelAPI.get("/setting/listalldistrict")) as {
    data: District[];
  };
  return data;
}
