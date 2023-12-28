import { Staff } from "@/types/supabase-table-type";
import { create } from "zustand";

type LocationDetailProps = {
  isOpen: boolean;
  onOpen: (manager: Staff, hub_id: string, hub_type: string) => void;
  onClose: () => void;
  manager: Staff;
  setManager: (manager: Staff) => void;
  hub_id: string;
  hub_type: string;
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
  hub_id: "",
  hub_type: "",
};

export const useLocationDetail = create<LocationDetailProps>((set) => ({
  ...initialValue,
  setManager: (manager: Staff) => set({ manager }),
  onOpen: (manager, hub_id, hub_type) =>
    set({ isOpen: true, manager: manager, hub_id: hub_id, hub_type: hub_type }),
  onClose: () => set({ isOpen: false }),
}));
