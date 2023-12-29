import { ParcelStatus } from "@/types/supabase-table-type";

export function convertUpdateParcelState(
  state: "delivery" | "confirm-sent" | "confirm-fail"
) {
  switch (state) {
    case "delivery":
      return {
        start: 'Changing parcel state to "delivery"',
        end: 'Changed parcel state to "delivery" successfully',
      };
    case "confirm-sent":
      return {
        start: "Update parcel state to sent successfully",
        end: 'Updated parcel state to "sent" successfully',
      };
    case "confirm-fail":
      return {
        start: "Update parcel state to fail successfully",
        end: 'Updated parcel state to "fail" successfully',
      };
  }
}

export function convertParcelDatabaseState(
  state: "delivery" | "confirm-sent" | "confirm-fail"
): ParcelStatus {
  switch (state) {
    case "delivery":
      return "sẵn sàng giao hàng";
    case "confirm-sent":
      return "đã giao";
    case "confirm-fail":
      return "đã trả lại điểm giao dịch đích";
  }
}
