import { useLocationModal } from "@/hooks/useLocationModal";
import Modal from "../modal/Modal";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";

const LocationModal = () => {
  const { isOpen, onClose, manager } = useLocationModal((set) => set);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[600px] bg-layout py-8 !px-0 !rounded-3xl gap-0"
    >
      <DialogHeader className="w-full px-9 mb-4">
        <DialogTitle className="text-2xl">Detailed info</DialogTitle>
        <DialogDescription>
            Everything you need to know about this hub
        </DialogDescription>      
      </DialogHeader>
      <Separator className="bg-border w-full"/>
      <div className="grid gap-2 py-2 px-9">
          <div className="text-xl">Manager</div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left">Name:</div>
            <div className="col-span-3">{manager.full_name}</div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left">Gender:</div>
            <div className="col-span-3 capitalize">{manager.gender}</div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left">Date of Birth:</div>
            <div className="col-span-3">{manager.dob}</div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left">Hometown:</div>
            <div className="col-span-3">{manager.home_town}</div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left">Phone number:</div>
            <div className="col-span-3">{manager.phone_number}</div>
          </div>
        </div>
    </Modal>
  );
};

export default LocationModal;