"use client";
import Modal from "../modals/Modal";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { useVietNamGeography } from "@/hooks/useVietNamGeography";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Location } from "@/types/supabase-table-type";
import convertLocationIdToString from "@/lib/convertLocationIdToString";
import axios from "axios";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useTransferLocations } from "@/hooks/useTransferLocations";
import { useNewLocations } from "@/hooks/useNewLocations";
import LocationPicker from "./location-picker";
import StaffInformation from "./staff-information";

export default function NewLocationModal() {
  const { isOpen, onClose, type, setType, location } = useNewLocations();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onChange={onChange} className="w-[900px]">
      <DialogHeader>
        <DialogTitle>New Facility</DialogTitle>
        <DialogDescription>
          Please fill in the information below to create a new facility.
        </DialogDescription>
      </DialogHeader>

      {type === "location" && <LocationPicker />}
      {type === "staff" && <StaffInformation />}

      
    </Modal>
  );
}
