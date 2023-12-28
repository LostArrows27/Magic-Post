import { IoDocumentText } from "react-icons/io5";
import { TiCloudStorage } from "react-icons/ti";
import { FaFileCircleXmark, FaTruckFast } from "react-icons/fa6";
import { MdFactCheck } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { countOrder } from "@/lib/countOrder";
import { useAllOrder } from "@/hooks/useAllOrder";
import { filterOrderByState } from "@/lib/filterOrder";

const orderFilter = {
  all: {
    name: "All parcels",
    icon: <IoDocumentText className="text-2xl text-gray-400" />,
    color: "*:text-blue-600",
  },
  notSentInStorage: {
    name: "In storage (not sent)",
    icon: <TiCloudStorage className="text-2xl text-gray-400" />,
    color: "*:text-green-600",
  },
  sentFailedStorage: {
    name: "In storage (sent failed)",
    icon: <FaFileCircleXmark className="text-2xl text-gray-400" />,
    color: "*:text-red-600",
  },
  transferSuccess: {
    name: "Transfered success",
    icon: <MdFactCheck className="text-2xl text-gray-400" />,
    color: "*:text-yellow-600",
  },
  isTransfer: {
    name: "Is transfering",
    icon: <FaTruckFast className="text-2xl text-gray-400" />,
    color: "*:text-pink-600",
  },
};

const ChooseState = () => {
  const { allOrderOrigin, setAllOrder } = useAllOrder((state) => ({
    allOrderOrigin: state.allOrderOriginData,
    setAllOrder: state.setAllOrder,
  }));

  const [sendingState, setSendingState] =
    useState<keyof typeof orderFilter>("all");

  return (
    <div className="w-full flex items-center overflow-hidden rounded-sm">
      {Object.keys(orderFilter).map((key, index) => (
        <div
          key={index}
          datatype={key}
          onClick={() => {
            setAllOrder(
              filterOrderByState(
                key as keyof typeof orderFilter,
                allOrderOrigin
              )
            );
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
            {countOrder(key as keyof typeof orderFilter, allOrderOrigin)}{" "}
            parcels
          </div>
          {key !== "isTransfer" && (
            <div className="absolute h-2/5 bg-gray-400 right-0 top-7 w-[1px]"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChooseState;
