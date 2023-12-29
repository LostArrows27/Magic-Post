"use client";
import Modal from "../modals/Modal";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTransferConfirmModal } from "@/hooks/useTransferConfirmModal";
import { useTransferOrdersList } from "@/hooks/useTransferOrdersList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useVietNamGeography } from "@/hooks/useVietNamGeography";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Customer, Location } from "@/types/supabase-table-type";
import convertLocationIdToString from "@/lib/convertLocationIdToString";
import axios from "axios";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useTransferLocations } from "@/hooks/useTransferLocations";
import { useViewParcelInformations } from "@/hooks/useViewParcelInformations";
import { Separator } from "../ui/separator";
import { FaLocationDot } from "react-icons/fa6";
import { ImTruck } from "react-icons/im";
import {
  FaBoxOpen,
  FaCheckSquare,
  FaIdCard,
  FaShoppingCart,
} from "react-icons/fa";
import { convertLocationID } from "@/lib/convertLocationID";
import { TbFileDescription } from "react-icons/tb";
import { format } from "date-fns";

export default function ViewParcelInformation() {
  const { isOpen, onClose, parcel } = useViewParcelInformations();

  const { district, ward, province } = useVietNamGeography();

  const { supabaseClient } = useSessionContext();

  useTransferLocations();

  const [sender, setSender] = useState<Customer>();
  const [receiver, setReceiver] = useState<Customer>();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (parcel) {
      (async () => {
        const { data: senderData, error: senderError } = await supabaseClient
          .from("customers")
          .select("*")
          .eq("id", parcel.sender_id)
          .single();
        if (senderError) {
          console.log(senderError);
        }
        if (senderData) {
          setSender(senderData);
        }
      })();
      (async () => {
        const { data: receiverData, error: receiverError } =
          await supabaseClient
            .from("customers")
            .select("*")
            .eq("id", parcel.receiver_id)
            .single();
        if (receiverError) {
          console.log(receiverError);
        }
        if (receiverData) {
          setReceiver(receiverData);
        }
      })();
    }
  }, [parcel, supabaseClient]);
  if (!parcel)
    return (
      <Modal
        isOpen={isOpen}
        onChange={onChange}
        className="max-w-[700px] max-h-[900px] overflow-hidden p-8 !rounded-2xl remove-button"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Parcel&apos;s Detail</DialogTitle>
        </DialogHeader>
        <h2 className="w-full text-center">Nothing here to see.</h2>
      </Modal>
    );
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[700px] max-h-[900px] overflow-hidden p-8 !rounded-2xl remove-button"
    >
      <DialogHeader>
        <DialogTitle className="text-2xl">Parcel&apos;s Detail</DialogTitle>
      </DialogHeader>
      <div className="w-full mt-4 flex flex-col gap-y-5">
        <div className="flex items-start  justify-between">
          <div className="flex items-center gap-x-4">
            <FaIdCard className="text-xl mr-1 text-yellow-600" />
            <div className="font-bold">ID</div>
          </div>
          <div className="max-w-[60%] break-words text-right">
            {/* {format(new Date(transfer.date_transferred), "p P")} */}
            {parcel.id}
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-x-4">
            <FaShoppingCart className="text-xl mr-1 text-green-600" />
            <div className="font-bold">Product Name</div>
          </div>
          <div className="max-w-[60%] break-words text-right">
            {/* {convertLocationID(transfer.from.id)},{" "}
            {convertLocationToString(transfer.from)} */}
            {parcel.product_name}
          </div>
        </div>
        <div className="flex items-start  justify-between">
          <div className="flex items-center gap-x-4">
            <TbFileDescription className="text-xl mr-1 text-blue-600" />
            <div className="font-bold">Description</div>
          </div>
          <div className="max-w-[60%] break-words text-right">
            {/* {convertLocationID(transfer.to.id)},{" "}
            {convertLocationToString(transfer.to)} */}
            {parcel.description}
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-x-4">
            <ImTruck className="text-xl mr-1 text-rose-500" />
            <div className="font-bold">From</div>
          </div>
          <div className="max-w-[60%] break-words text-right text-right">
            <div className="font-bold text-right">{sender?.full_name}</div>
            {convertLocationID(parcel.origin_location_id)},{" "}
            {convertLocationIdToString({
              ward,
              district,
              province,
              locationId: parcel.origin_location_id,
            })}
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-x-4">
            <FaLocationDot className="text-xl mr-1 text-blue-600" />
            <div className="font-bold">To</div>
          </div>
          <div className="max-w-[60%] text-right break-words">
            <div className="font-bold text-right">{receiver?.full_name}</div>
            {convertLocationID(parcel.destination_location_id)},{" "}
            {convertLocationIdToString({
              ward,
              district,
              province,
              locationId: parcel.destination_location_id,
            })}
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-x-4">
            <FaBoxOpen className="text-xl mr-1 text-red-600" />
            <div className="font-bold">
              Measures (weight/height/width/length)
            </div>
          </div>
          <div className="max-w-[60%] *:text-sm break-words">
            {/* {convertTransferState(transfer, workLocation.id)} */}
            {parcel.weight} kg
            {parcel.height ? " /" + parcel.height + "cm" : ""}
            {parcel.width ? " /" + parcel.width + "cm" : ""}
            {parcel.length ? " /" + parcel.length + "cm" : ""}
          </div>
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-x-4">
            <FaCheckSquare className="text-xl mr-1 text-pink-600" />
            <div className="font-bold">Date Sent</div>
          </div>
          <div className="max-w-[60%] break-words text-right">
            {format(new Date(parcel.date_sent), "p P")}
          </div>
        </div>
      </div>

      <Separator className="my-3" />
    </Modal>
  );
}
