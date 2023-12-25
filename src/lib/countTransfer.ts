import { TransferWithParcelData } from "@/types/supabase-table-type";

export function countTransfer(
  type:
    | "all"
    | "isSending"
    | "sendingSuccess"
    | "waitingReceive"
    | "recevingSuccess",
  data: TransferWithParcelData[],
  location: string
) {
  switch (type) {
    case "all":
      return data.length;
    case "isSending":
      return data.filter((item) => {
        return location === item.from_location_id && !item.has_verfied;
      }).length;
    case "sendingSuccess":
      return data.filter((item) => {
        return location === item.from_location_id && item.has_verfied;
      }).length;
    case "waitingReceive":
      return data.filter((item) => {
        return location === item.to_location_id && !item.has_verfied;
      }).length;
    case "recevingSuccess":
      return data.filter((item) => {
        return location === item.to_location_id && item.has_verfied;
      }).length;
    default:
      return data.length;
  }
}
