import { Staff } from "@/types/supabase-table-type";
import { create } from "zustand";

type LocationModalProps = {
  isOpen: boolean;
  onOpen: (manager: Staff) => void;
  onClose: () => void;
  reset: () => void;
  manager: Staff;
};

const initialValue = {
  isOpen: false,
  manager: {
    created_at: "",
    dob: "",
    full_name: "",
    gender: "",
    home_town: "",
    id: "",
    phone_number: "",
    role: "",
    work_place_id: null,
  } as unknown as Staff,
};

export const useLocationModal = create<LocationModalProps>((set) => ({
  ...initialValue,
  onOpen: (manager) => set({ isOpen: true, manager: manager }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initialValue }),
}));