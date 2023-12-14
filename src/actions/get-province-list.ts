import { viettelAPI } from "@/services/config";
import { Province } from "@/types/geometry-type";

export async function getProvinceList() {
  const { data } = (await viettelAPI.get("/setting/listallprovince")) as {
    data: Province[];
  };
  return data;
}
