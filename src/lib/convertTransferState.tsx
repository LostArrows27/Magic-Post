import { TransferWithParcelData } from "@/types/supabase-table-type";
import { FaCheck, FaSpinner } from "react-icons/fa6";

export function convertTransferState(
  transfer: TransferWithParcelData,
  location: string
) {
  if (location === transfer.from_location_id) {
    if (!transfer.has_verfied) {
      return (
        <div className="bg-gray-600 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
          <FaSpinner className="animate-spin text-white" />
          <span className="text-white">Is Sending</span>
        </div>
      );
    } else {
      return (
        <div className="bg-green-600 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
          <FaCheck className=" text-white" />
          <span className="text-white">Sending Success</span>
        </div>
      );
    }
  } else {
    if (!transfer.has_verfied) {
      return (
        <div className="bg-blue-600 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
          <FaSpinner className="animate-spin text-white" />
          <span className="text-white">Waiting Receive</span>
        </div>
      );
    } else {
      return (
        <div className="bg-yellow-600 py-2 px-3 w-fit items-center rounded-xl inline-flex gap-x-3 justify-between">
          <FaCheck className=" text-white" />
          <span className="text-white">Receive Success</span>
        </div>
      );
    }
  }
}
