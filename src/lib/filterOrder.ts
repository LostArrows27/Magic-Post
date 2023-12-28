import { Parcel } from "@/types/supabase-table-type";

export function filterOrderByState(
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
      return parcel;
    case "notSentInStorage":
      return parcel.filter(
        (item) =>
          item.state === "đã nhận từ khách hàng" ||
          item.state === "đã nhận từ điểm tập kết đích"
      );
    case "sentFailedStorage":
      return parcel.filter(
        (item) => item.state === "đã trả lại điểm giao dịch đích"
      );
    case "transferSuccess":
      return parcel.filter((item) => item.state === "đã giao");
    case "isTransfer":
      return parcel.filter((item) => item.state === "sẵn sàng giao hàng");

    default:
      return parcel;
  }
}

export function filterOrderBySort(
  type: "weight" | "fee" | "time" | "name",
  allOrder: Parcel[],
  order: "asc" | "desc"
) {
  if (type === "weight") {
    if (order === "asc") {
      return allOrder.sort((a, b) => a.weight - b.weight);
    } else {
      return allOrder.sort((a, b) => b.weight - a.weight);
    }
  }

  if (type === "fee") {
    if (order === "asc") {
      return allOrder.sort((a, b) => a.paid_fee - b.paid_fee);
    } else {
      return allOrder.sort((a, b) => b.paid_fee - a.paid_fee);
    }
  }

  if (type === "time") {
    if (order === "asc") {
      return allOrder.sort((a, b) => {
        const dateA = new Date(a.date_sent);
        const dateB = new Date(b.date_sent);
        return dateA.getTime() - dateB.getTime();
      });
    } else {
      return allOrder.sort((a, b) => {
        const dateA = new Date(a.date_sent);
        const dateB = new Date(b.date_sent);
        return dateB.getTime() - dateA.getTime();
      });
    }
  }

  if (order === "asc") {
    return allOrder.sort((a, b) => a.weight - b.weight);
  } else {
    return allOrder.sort((a, b) => b.weight - a.weight);
  }
}
