import { create } from "zustand";



export type HubLineChart = {
 delivered:number,
    stored:number,
    delivering:number,
    setDelivered: (delivered: number) => void;
    setStored: (stored: number) => void;
    setDelivering: (delivering: number) => void;

};

export const useHubLineChart = create<HubLineChart>((set) => ({
   
    delivered:0,
    stored:0,
    delivering:0,
    setDelivered: (delivered) => set(() => ({ delivered })),
    setStored: (stored) => set(() => ({ stored })),
    setDelivering: (delivering) => set(() => ({ delivering })),
}));
