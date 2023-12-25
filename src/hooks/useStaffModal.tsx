import { Staff } from "@/types/supabase-table-type";
import { create } from "zustand";

type StaffModalProps = {
  isOpen: boolean;
  onOpen: (manager: Staff) => void;
  onClose: () => void;
  reset: () => void;
  staff: Staff;
};

const initialValue = {
  isOpen: false,
  staff: {
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

export const useStaffModal = create<StaffModalProps>((set) => ({
  ...initialValue,
  onOpen: (staff) => set({ isOpen: true, staff: staff }),
  onClose: () => set({ isOpen: false }),
  reset: () => set({ ...initialValue }),
}));