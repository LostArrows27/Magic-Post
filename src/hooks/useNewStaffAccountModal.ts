
import {create} from "zustand";

type useNewStaffAccountProps = {
  isOpen: boolean;
  email: string;
  password: string;
  onOpen: ({email,password} : {email:string,password:string}) => void;
  onClose: () => void;
  reset: () => void;
};

const initialValue = {
  isOpen: false,
  email: "",
  password: "",
};

export const useNewStaffAccountModal = create<useNewStaffAccountProps>((set) => ({
    ...initialValue,
    onOpen: ({email,password}) => set({ isOpen: true, email, password }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initialValue }),
})
);
