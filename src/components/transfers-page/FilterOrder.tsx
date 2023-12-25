import { useAllTransfer } from "@/hooks/useAllTransfer";
import { useUser } from "@/hooks/useUser";
import { countTransfer } from "@/lib/countTransfer";
import { filterTransferDataByState } from "@/lib/filterTransferData";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FaTruckFast } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { MdFactCheck } from "react-icons/md";

const orderFilter = {
  all: {
    name: "All transfers",
    icon: <IoDocumentText className="text-2xl text-gray-400" />,
    color: "*:text-blue-600",
  },
  isSending: {
    name: "Sending Transfer",
    icon: <FaTruckFast className="text-2xl text-gray-400" />,
    color: "*:text-green-600",
  },
  sendingSuccess: {
    name: "Sent Success Transfer",
    icon: <MdFactCheck className="text-2xl text-gray-400" />,
    color: "*:text-red-600",
  },
  waitingReceive: {
    name: "Waiting Transfer",
    icon: <FaTruckFast className="text-2xl text-gray-400" />,
    color: "*:text-yellow-600",
  },
  recevingSuccess: {
    name: "Received Transfer",
    icon: <MdFactCheck className="text-2xl text-gray-400" />,
    color: "*:text-pink-600",
  },
};

const FilterOrder = () => {
  const { setAllTransfers, allTransferOriginData } = useAllTransfer((set) => ({
    allTransferOriginData: set.allTransferOriginData,
    setAllTransfers: set.setAllTransfer,
  }));

  const [sendingState, setSendingState] =
    useState<keyof typeof orderFilter>("all");

  const { workLocation } = useUser();
  useEffect(() => {
    const newData = filterTransferDataByState(
      sendingState,
      allTransferOriginData,
      workLocation.id
    );

    setAllTransfers(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendingState]);

  return (
    <div className="w-full flex items-center overflow-hidden rounded-sm">
      {Object.keys(orderFilter).map((key, index) => (
        <div
          key={index}
          datatype={key}
          onClick={() => {
            setSendingState(key as keyof typeof orderFilter);
          }}
          className={cn(
            "w-1/5 h-24 select-none cursor-pointer bg-gray-100 relative border-t-4 border-transparent center flex-col",
            {
              "border-amber-200": key === sendingState,
              "bg-amber-50": key === sendingState,
            }
          )}
        >
          <div className="flex items-center gap-x-3">
            <span
              className={cn("", {
                [orderFilter[key as keyof typeof orderFilter].color]:
                  key === sendingState,
              })}
            >
              {orderFilter[key as keyof typeof orderFilter].icon}
            </span>
            <span className="font-semibold text-sm">
              {orderFilter[key as keyof typeof orderFilter].name}
            </span>
          </div>
          <div className="py-2 text-sm">
            {countTransfer(
              key as keyof typeof orderFilter,
              allTransferOriginData,
              workLocation.id
            )}{" "}
            transfers
          </div>
          {key !== "recevingSuccess" && (
            <div className="absolute h-2/5 bg-gray-400 right-0 top-7 w-[1px]"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterOrder;
