import { viettelLocationAPI } from "@/services/config";
import { Subward } from "@/types/geometry-type";

export async function getSubwardBasedOnWard(ward_location_id: string) {
  const { data } = (await viettelLocationAPI.get(
    `/autocomplete?system=VTP&ctx=SUBWARD&ctx=${ward_location_id}`
  )) as { data: Subward[] };

  return data;
}
