"use client";

import { IoReceiptSharp } from "react-icons/io5";
import { FaTruckArrowRight } from "react-icons/fa6";
import { useOrderFormProgress } from "@/hooks/useOrderFormProgress";
import { cn } from "@/lib/utils";
import { BiSolidPackage } from "react-icons/bi";

const OrderProgress = () => {
  const { currentStep, setCurrentStep } = useOrderFormProgress();

  return (
    <div className="flex justify-center  h-full w-full items-center">
      <div className="h-full relative  rounded-lg w-3 bg-primary/20">
        <div
          className={cn(
            "rounded-lg absolute top-0 z-0 bottom-0  w-full bg-primary",
            {
              "h-1/3": currentStep === 1,
              "h-2/3": currentStep === 2,
              "h-full": currentStep === 3,
            }
          )}
        ></div>
        <div className="w-full h-1/3 center z-10 relative">
          <div
            className={cn(
              "bg-[#e0d8d0] w-14 shrink-0 h-14 rounded-full center",
              {
                "bg-primary": currentStep >= 1,
              }
            )}
          >
            <FaTruckArrowRight
              className={cn("text-3xl text-gray-400", {
                "text-white": currentStep >= 1,
              })}
            />
          </div>
        </div>
        <div className="w-full h-1/3 center z-10 relative">
          <div
            className={cn(
              "bg-[#e0d8d0] w-14 shrink-0 h-14 rounded-full center",
              {
                "bg-primary": currentStep >= 2,
              }
            )}
          >
            <BiSolidPackage
              className={cn("text-3xl text-gray-400", {
                "text-white": currentStep >= 2,
              })}
            />
          </div>
        </div>
        <div className="w-full h-1/3 center z-10 relative">
          <div
            className={cn(
              "bg-[#e0d8d0] w-14 shrink-0 h-14 rounded-full center",
              {
                "bg-primary": currentStep >= 3,
              }
            )}
          >
            <IoReceiptSharp
              className={cn("text-3xl text-gray-400", {
                "text-white": currentStep >= 3,
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
1;

export default OrderProgress;
