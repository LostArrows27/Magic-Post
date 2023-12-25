import { Location, ParcelStatus } from "@/types/supabase-table-type";

export function convertConfirmTransferState(from: Location, to: Location) {
  if (from.type === "giao_dich" && to.type === "tap_ket") {
    return "đã nhận từ điểm giao dịch gửi";
  }

  if (from.type === "tap_ket" && to.type === "tap_ket") {
    return "đã nhận từ điểm tập kết gửi";
  }

  if (from.type === "tap_ket" && to.type === "giao_dich") {
    return "sẵn sàng giao hàng";
  }
}
