import { viettelAPI } from "@/services/config";
import { Ward } from "@/types/geometry-type";

export async function getAllWardList() {
  const { data } = (await viettelAPI.get("/setting/listallwards")) as {
    data: Ward[];
  };
  return data;
}
