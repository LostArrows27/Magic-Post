import { Parcel } from "@/types/supabase-table-type";

export function countOrder(
  type:
    | "all"
    | "notSentInStorage"
    | "sentFailedStorage"
    | "transferSuccess"
    | "isTransfer",
  parcel: Parcel[]
) {
  switch (type) {
    case "all":
      return parcel.length;
    case "notSentInStorage":
      return parcel.filter(
        (item) =>
          item.state === "đã nhận từ khách hàng" ||
          item.state === "đã nhận từ điểm tập kết đích"
      ).length;
    case "sentFailedStorage":
      return parcel.filter(
        (item) => item.state === "đã trả lại điểm giao dịch đích"
      ).length;
    case "transferSuccess":
      return parcel.filter((item) => item.state === "đã giao").length;
    case "isTransfer":
      return parcel.filter((item) => item.state === "sẵn sàng giao hàng")
        .length;
    default:
      return parcel.length;
  }
}
