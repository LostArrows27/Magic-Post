import { TransferWithParcelData } from "@/types/supabase-table-type";

export function filterTransferDataByState(
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
      return data;
    case "isSending":
      return data.filter((item) => {
        return location === item.from_location_id && !item.has_verfied;
      });
    case "sendingSuccess":
      return data.filter((item) => {
        return location === item.from_location_id && item.has_verfied;
      });
    case "waitingReceive":
      return data.filter((item) => {
        return location === item.to_location_id && !item.has_verfied;
      });
    case "recevingSuccess":
      return data.filter((item) => {
        return location === item.to_location_id && item.has_verfied;
      });
    default:
      return data;
  }
}

export function filterTransferByLocation(
  type: string,
  data: TransferWithParcelData[],
  location: string
) {
  switch (type) {
    case "all":
      return data;
    case "send":
      return data.filter((item) => item.from_location_id === location);
    case "receive":
      return data.filter((item) => item.to_location_id === location);
    default:
      return data;
  }
}

export function filterTransferByRange(
  from: Date | undefined,
  to: Date | undefined,
  data: TransferWithParcelData[]
) {
  if (from && to) {
    return data.filter((item) => {
      const itemDate = new Date(item.date_transferred);
      return itemDate >= from && itemDate <= to;
    });
  }

  if (from && !to) {
    return data.filter((item) => {
      const itemDate = new Date(item.date_transferred);
      return itemDate >= from;
    });
  }

  if (to && !from) {
    return data.filter((item) => {
      const itemDate = new Date(item.date_transferred);
      return itemDate <= to;
    });
  }

  return data;
}
