import { create } from "zustand";

type Stat = {
  count: number;
  prevMonthGrow: string;
};

export type CentralHubStat = {
  all: Stat;
  stash: Stat;
  progress: Stat;
  delivered: Stat;
  setAll: (all: Stat) => void;
  setStash: (stash: Stat) => void;
  setProgress: (progress: Stat) => void;
  setDelivered: (delivered: Stat) => void;
};

export const useCentralHubStat = create<CentralHubStat>((set) => ({
  all: {
    count: 0,
    prevMonthGrow: "",
  },
  stash: {
    count: 0,
    prevMonthGrow: "",
  },
  progress: {
    count: 0,
    prevMonthGrow: "",
  },
  delivered: {
    count: 0,
    prevMonthGrow: "",
  },
  setAll: (all) => set(() => ({ all })),
  setStash: (stash) => set(() => ({ stash })),
  setProgress: (progress) => set(() => ({ progress })),
  setDelivered: (delivered) => set(() => ({ delivered })),
}));
