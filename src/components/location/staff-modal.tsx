import { useStaffModal } from "@/hooks/useStaffModal";
import Modal from "../modal/Modal";
import { DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import {
  FaAddressCard,
  FaHome,
  FaPhoneAlt,
  FaRegUserCircle,
} from "react-icons/fa";
import { TbGenderBigender } from "react-icons/tb";
import { MdCalendarMonth, MdEmail } from "react-icons/md";
import convertStaffRole from "@/lib/convertStaffRole";
import { Button } from "../ui/button";
import { CalendarIcon, Check, Pen, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useLocation } from "@/hooks/useLocation";
import { Staff } from "@/types/supabase-table-type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { useLocationDetail } from "@/hooks/useLocationDetail";
import { BlobOptions } from "buffer";
import { useStaff } from "@/hooks/useStaff";
import { useUser } from "@/hooks/useUser";

type EditField = {
  edit: boolean;
  value: string;
};
const initialValue = {
  edit: false,
  value: "",
};

const StaffModal = () => {
  const { isOpen, onClose, staff } = useStaffModal((set) => set);
  const [name, setName] = useState<EditField>(initialValue);
  const [gender, setGender] = useState<EditField>(initialValue);
  const { setManager } = useLocationDetail();
  const [dob, setDob] = useState<EditField>(initialValue);
  const [currentStaff, setCurrentStaff] = useState<Staff>();
  const [homeTown, setHomeTown] = useState<EditField>(initialValue);
  let { staffs, isLoading, isError, fetchStaffs, setStaffs } = useStaff();
  const { userDetails } = useUser();
  const [phoneNumber, setPhoneNumber] = useState<
    EditField & { error: boolean }
  >({
    ...initialValue,
    error: false,
  });
  const { supabaseClient } = useSessionContext();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (staff.full_name !== "") {
      setCurrentStaff(staff);
      setName((prev) => ({ ...prev, value: staff.full_name }));
      setGender((prev) => ({ ...prev, value: staff.gender }));
      setDob((prev) => ({ ...prev, value: staff.dob }));
      setHomeTown((prev) => ({ ...prev, value: staff.home_town }));
      setPhoneNumber((prev) => ({ ...prev, value: staff.phone_number }));
    }
  }, [staff]);

  const handleUpdate = async (
    field: "name" | "gender" | "dob" | "hometown" | "phonenumber"
  ) => {
    let updateData = {};
    if (field === "name") {
      updateData = {
        full_name: name.value,
      };
      setName((prev) => ({ ...prev, edit: false }));
      setCurrentStaff((prev) => ({ ...prev, full_name: name.value } as Staff));
    } else if (field === "gender") {
      updateData = {
        gender: gender.value,
      };
      setGender((prev) => ({ ...prev, edit: false }));
      setCurrentStaff((prev) => ({ ...prev, gender: gender.value } as Staff));
    } else if (field === "dob") {
      updateData = {
        dob: dob.value,
      };
      setDob((prev) => ({ ...prev, edit: false }));
      setCurrentStaff((prev) => ({ ...prev, dob: dob.value } as Staff));
    } else if (field === "hometown") {
      updateData = {
        home_town: homeTown.value,
      };
      setHomeTown((prev) => ({
        ...prev,
        edit: false,
      }));
      setCurrentStaff(
        (prev) => ({ ...prev, home_town: homeTown.value } as Staff)
      );
    } else if (field === "phonenumber") {
      updateData = {
        phone_number: phoneNumber.value,
      };
      setPhoneNumber((prev) => ({
        ...prev,
        edit: false,
        error: false,
      }));
      setCurrentStaff(
        (prev) => ({ ...prev, phone_number: phoneNumber.value } as Staff)
      );
    }

    const { error } = await supabaseClient
      .from("staffs")
      .update(updateData)
      .eq("id", staff.id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Update success");
    }
  };

  useEffect(() => {
    if (currentStaff) {
      if (currentStaff.role.includes("admin")) {
        setManager(currentStaff);
      } else if (currentStaff.role.includes("staff")) {
        //update the staff in staffs using setSTaff
        const newStaffs = staffs.map((staff) => {
          if (staff.id === currentStaff.id) {
            return currentStaff;
          }
          return staff;
        });
        setStaffs(newStaffs);
      }
    }
  }, [currentStaff]);
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[700px] bg-layout py-8  px-9 !rounded-3xl gap-0"
    >
      <DialogHeader className="w-full  mb-4">
        <DialogTitle className="text-2xl">Staff detail</DialogTitle>
      </DialogHeader>
      <Separator className="bg-border w-full  " />
      {currentStaff ? (
        <div className="grid gap-y-4 gap-2 py-6 ">
          {/* <div className="text-xl">staff</div> */}
          <div className="grid grid-cols-4 items-start gap-4    ">
            <div className="text-left flex gap-x-3 items-center">
              <FaRegUserCircle />
              Staff&apos;s Name:
            </div>
            <div className="col-span-3 flex gap-x-3 items-center group   ">
              {!name.edit ? (
                <>
                  {currentStaff.full_name}
                  <Pen
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 cursor-pointer"
                    onClick={() => {
                      setName((prev) => ({ ...prev, edit: true }));
                    }}
                  />
                </>
              ) : (
                <>
                  <Input
                    value={name.value}
                    onChange={(e) => {
                      setName((prev) => ({ ...prev, value: e.target.value }));
                    }}
                  />
                  <Check
                    onClick={() => {
                      handleUpdate("name");
                    }}
                    className="w-8 h-8 cursor-pointer hover:bg-muted rounded-full p-1 text-green-500 "
                  />
                  <X
                    onClick={() => {
                      setName((prev) => ({
                        ...prev,
                        value: currentStaff.full_name,
                        edit: false,
                      }));
                    }}
                    className="w-8 h-8 cursor-pointer hover:bg-muted rounded-full p-1 text-red-400"
                  />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left flex gap-x-3 items-center ">
              <TbGenderBigender />
              Gender:
            </div>
            <div className="col-span-3 flex gap-x-3 items-center group capitalize ">
              {!gender.edit ? (
                <>
                  {currentStaff.gender}
                  <Pen
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 cursor-pointer"
                    onClick={() => {
                      setGender((prev) => ({ ...prev, edit: true }));
                    }}
                  />
                </>
              ) : (
                <>
                  <Select
                    value={gender.value}
                    onValueChange={(value) => {
                      setGender((prev) => ({ ...prev, value }));
                    }}
                  >
                    <SelectTrigger className="w-full bg-primary text-primary-foreground">
                      <SelectValue placeholder="Choose office branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-primary text-primary-foreground">
                      <SelectItem value={"male"}>Male</SelectItem>
                      <SelectItem value={"female"}>Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <Check
                    onClick={() => {
                      handleUpdate("gender");
                    }}
                    className="w-8 h-8 cursor-pointer hover:bg-muted rounded-full p-1 text-green-500 "
                  />
                  <X
                    onClick={() => {
                      setGender((prev) => ({
                        ...prev,
                        value: currentStaff.gender,
                        edit: false,
                      }));
                    }}
                    className="w-8 h-8 cursor-pointer hover:bg-muted rounded-full p-1 text-red-400"
                  />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left flex gap-x-3 items-center ">
              <FaAddressCard />
              Role:
            </div>
            <div className="col-span-3 flex gap-x-3 items-center  capitalize">
              {convertStaffRole(staff.role)}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left flex gap-x-3 items-center">
              <MdCalendarMonth />
              Date of Birth:
            </div>
            <div className="col-span-3 flex gap-x-3 items-center group">
              {!dob.edit ? (
                <>
                  {currentStaff.dob}
                  <Pen
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 cursor-pointer"
                    onClick={() => {
                      setDob((prev) => ({ ...prev, edit: true }));
                    }}
                  />
                </>
              ) : (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(" pl-3 text-left font-normal")}
                      >
                        {dob.value ? (
                          format(new Date(dob.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        defaultMonth={new Date(dob.value)}
                        selected={new Date(dob.value)}
                        onSelect={(date) => {
                          if (!date) return;
                          setDob((prev) => ({
                            ...prev,
                            value: format(date, "yyyy-MM-dd"),
                          }));
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <Check
                    onClick={() => {
                      handleUpdate("dob");
                    }}
                    className="w-8 h-8 cursor-pointer hover:bg-muted rounded-full p-1 text-green-500 "
                  />
                  <X
                    onClick={() => {
                      setDob((prev) => ({
                        ...prev,
                        value: currentStaff.dob,
                        edit: false,
                      }));
                    }}
                    className="w-8 h-8 cursor-pointer hover:bg-muted rounded-full p-1 text-red-400"
                  />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left flex gap-x-3 items-center">
              <MdEmail />
              Email:
            </div>
            <div className="col-span-3 flex gap-x-3 items-center group">
              {currentStaff.email}
              <Pen
                className="w-4 h-4 opacity-0 group-hover:opacity-100 cursor-pointer"
                onClick={() => {
                  setPhoneNumber((prev) => ({ ...prev, edit: true }));
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left flex gap-x-3 items-center">
              <FaPhoneAlt />
              Phone number:
            </div>
            <div className="col-span-3 flex gap-x-3 items-center group">
              {!phoneNumber.edit ? (
                <>
                  {currentStaff.phone_number}
                  <Pen
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 cursor-pointer"
                    onClick={() => {
                      setPhoneNumber((prev) => ({ ...prev, edit: true }));
                    }}
                  />
                </>
              ) : (
                <>
                  <Input
                    value={phoneNumber.value}
                    onChange={(e) => {
                      setPhoneNumber((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }));
                    }}
                    className={cn("", phoneNumber.error && "border-red-500")}
                  />
                  <Check
                    onClick={() => {
                      //check if phone number is valid check the length and the format with regex ^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$
                      if (
                        !RegExp(
                          /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
                        ).test(phoneNumber.value)
                      ) {
                        setPhoneNumber((prev) => ({
                          ...prev,
                          error: true,
                        }));
                        return;
                      }

                      handleUpdate("phonenumber");
                    }}
                    className="w-8 h-8 cursor-pointer hover:bg-muted rounded-full p-1 text-green-500 "
                  />
                  <X
                    onClick={() => {
                      setPhoneNumber((prev) => ({
                        ...prev,
                        value: currentStaff.phone_number,
                        edit: false,
                      }));
                    }}
                    className="w-8 h-8 cursor-pointer hover:bg-muted rounded-full p-1 text-red-400"
                  />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="text-left flex gap-x-3 items-center">
              <FaHome />
              Hometown:
            </div>
            <div className="col-span-3 flex gap-x-3 items-center group">
              {!homeTown.edit ? (
                <>
                  {currentStaff.home_town}
                  <Pen
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 cursor-pointer"
                    onClick={() => {
                      setHomeTown((prev) => ({ ...prev, edit: true }));
                    }}
                  />
                </>
              ) : (
                <>
                  <Input
                    value={homeTown.value}
                    onChange={(e) => {
                      setHomeTown((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }));
                    }}
                  />
                  <Check
                    onClick={() => {
                      handleUpdate("hometown");
                    }}
                    className="w-8 h-8 cursor-pointer hover:bg-muted rounded-full p-1 text-green-500 "
                  />
                  <X
                    onClick={() => {
                      setHomeTown((prev) => ({
                        ...prev,
                        value: currentStaff.home_town,
                        edit: false,
                      }));
                    }}
                    className="w-8 h-8 cursor-pointer hover:bg-muted rounded-full p-1 text-red-400"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          No Information
        </div>
      )}
    </Modal>
  );
};

export default StaffModal;
