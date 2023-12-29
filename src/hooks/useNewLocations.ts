import { Customer } from "@/types/supabase-table-type";
import { create } from "zustand";

export type FormType = "location" | "staff";
type NewLocations = {
    isOpen: boolean;
    location: {provinceId:string,districtId:string} ;
    type: "location" | "staff"
    setType: (type: FormType) => void;
    onOpen: () => void;
    onClose: () => void;
    setLocation: (location: {provinceId:string,districtId:string}) => void;
    reset: () => void;
};
const initialValue = {
    isOpen: false,
    location: {
        provinceId: "",
        districtId: "",
    },
    type: "location" as FormType,

}

export const useNewLocations = create<NewLocations>((set) => ({
    ...initialValue,
    setLocation: (location: {provinceId:string,districtId:string}) => set({ location }),
    setType: (type: FormType) => set({ type }),
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initialValue }),
}));
