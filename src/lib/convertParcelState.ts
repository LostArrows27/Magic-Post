import { ParcelStatus } from "@/types/supabase-table-type";
import { FaTruck, FaUser } from "react-icons/fa6";
import { MdKeyboardReturn } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { IoStorefront } from "react-icons/io5";
export function convertParcelState(parcelState: ParcelStatus) {
  switch (parcelState) {
    case "đã nhận từ khách hàng":
      return {
        label: "Haven't sent",
        color: "bg-yellow-500",
        icon: FaUser,
      };
    case "đã trả lại điểm giao dịch đích":
      return {
        label: "Sent failed",
        color: "bg-rose-500",
        icon: MdKeyboardReturn,
      };
    case "đã giao":
      return {
        label: "Sent success",
        color: "bg-green-500",
        icon: TiTick,
      };
    case "sẵn sàng giao hàng":
      return {
        label: "Is sending",
        color: "bg-blue-500",
        icon: FaTruck,
      };
    case "đã nhận từ điểm tập kết đích":
      return {
        label: "In storage",
        color: "bg-gray-500",
        icon: IoStorefront,
      };
    default:
      return {
        label: "In storage",
        color: "bg-gray-500",
        icon: IoStorefront,
      };
  }
}
