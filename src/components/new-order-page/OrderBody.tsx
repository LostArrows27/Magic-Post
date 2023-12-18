"use client";

import { useOrderFormProgress } from "@/hooks/useOrderFormProgress";
import { cn } from "@/lib/utils";
import FirstForm from "./FirstForm";

const OrderBody = () => {
  const { currentStep, setCurrentStep } = useOrderFormProgress();

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
        <p className=" font-medium">Pickup contact details</p>
        <p className="text-gray-400">Step {currentStep} - 3</p>
      </div>
      {currentStep === 1 && <FirstForm />}
      {currentStep === 2 && <p>Step 2</p>}
      {currentStep === 3 && <p>Step 3</p>}
    </>
  );
};

export default OrderBody;
