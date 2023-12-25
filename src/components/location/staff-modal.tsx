import { useStaffModal } from "@/hooks/useStaffModal";
import Modal from "../modal/Modal";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";

const StaffModal = () => {
  const { isOpen, onClose, staff } = useStaffModal((set) => set);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[1000px] bg-layout py-8 !px-0 !rounded-3xl gap-0"
    >
      <DialogHeader className="w-full px-9 mb-4">
        <DialogTitle className="text-2xl">
          Staff detail
        </DialogTitle>     
      </DialogHeader>
      <Separator className="bg-border w-full"/>
      <div className="grid gap-2 py-2 px-9">
          <div className="text-xl">staff</div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left">Staff:</div>
            <div className="col-span-3">{staff.full_name}</div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left">Gender:</div>
            <div className="col-span-3 capitalize">{staff.gender}</div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left">Date of Birth:</div>
            <div className="col-span-3">{staff.dob}</div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left">Hometown:</div>
            <div className="col-span-3">{staff.home_town}</div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left">Phone number:</div>
            <div className="col-span-3">{staff.phone_number}</div>
          </div>
        </div>
    </Modal>
  );
};

export default StaffModal;