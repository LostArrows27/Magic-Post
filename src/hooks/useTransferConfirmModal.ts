
import {create} from "zustand";

type TransferConfirmModalProps = {
  state: ("gd=>tk" | "tk=>tk" | "tk=>gd" | null)
  isOpen: boolean;
  onOpen: (state:"gd=>tk" | "tk=>tk" | "tk=>gd" ) => void;
  onClose: () => void;
  reset: () => void;
};

const initialValue = {
  isOpen: false,
  state: null,
};

export const useTransferConfirmModal = create<TransferConfirmModalProps>((set) => ({
    ...initialValue,
    onOpen: (state) => set({ isOpen: true, state }),
    onClose: () => set({ isOpen: false }),
    reset: () => set({ ...initialValue }),
})
);
