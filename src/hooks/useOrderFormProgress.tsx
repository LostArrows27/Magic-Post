import { create } from "zustand";

type OrderFormProgressState = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export const useOrderFormProgress = create<OrderFormProgressState>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set(() => ({ currentStep: step })),
}));
