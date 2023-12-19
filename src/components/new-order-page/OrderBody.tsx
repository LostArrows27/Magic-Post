"use client";

import { useOrderFormProgress } from "@/hooks/useOrderFormProgress";
import { cn } from "@/lib/utils";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import { useOrderFormData } from "@/hooks/useOrderFormData";
import LastForm from "./LastForm";

const OrderBody = () => {
  const { currentStep } = useOrderFormProgress();

  return (
    <>
      <div className="w-full rounded-xl h-6 bg-primary/20 mt-6 mb-3">
        <div
          className={cn("h-full rounded-xl bg-primary", {
            "w-1/3": currentStep === 1,
            "w-2/3": currentStep === 2,
            "w-full": currentStep === 3,
          })}
        ></div>
      </div>
      <div className="flex justify-between w-full ">
        <p className=" font-medium">
          {currentStep === 1
            ? "Sender customer information"
            : currentStep === 2
            ? "Receiver customer information"
            : "Order details"}
        </p>
        <p className="text-gray-400">Step {currentStep} - 3</p>
      </div>
      {currentStep === 1 && <FirstForm />}
      {currentStep === 2 && <SecondForm />}
      {currentStep === 3 && <LastForm />}
    </>
  );
};

export default OrderBody;
