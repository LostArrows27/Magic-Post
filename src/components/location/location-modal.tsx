import { useLocationModal } from "@/hooks/useLocationModal";
import Modal from "../modal/Modal";
import { DialogHeader } from "../ui/dialog";
import { Separator } from "../ui/separator";

const LocationModal = () => {
  const { isOpen, onClose } = useLocationModal((set) => set);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[600px] bg-layout pt-7 pb-16 !px-0 !rounded-3xl gap-0"
    >
      <DialogHeader className="sm:text-center w-full px-9 mb-4 text-2xl font-bold text-center">
        Creating your own event
      </DialogHeader>
      <Separator className="bg-primary w-full " />
    </Modal>
  );
};

export default LocationModal;