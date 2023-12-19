import { viettelAPI } from "@/services/config";

export async function getEstimatePrice(
  sender_province: string,
  sender_district: string,
  receiver_province: string,
  receiver_district: string,
  product_weight: number
) {
  const response = await viettelAPI.post("/tmdt/getPriceAll", {
    SENDER_PROVINCE: sender_province,
    SENDER_DISTRICT: sender_district,
    RECEIVER_PROVINCE: receiver_province,
    RECEIVER_DISTRICT: receiver_district,
    PRODUCT_WEIGHT: product_weight,
    PRODUCT_TYPE: "HH",
  });

  return response.data[0].GIA_CUOC + " VND - " + response.data[0].THOI_GIAN;
}
