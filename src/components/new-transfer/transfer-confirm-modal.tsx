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
import { Location } from "@/types/supabase-table-type";

export default function TransferConfirmModal() {
  const { isOpen, onClose,state } = useTransferConfirmModal();
  const { userDetails } = useUser();
  const { district, ward, province } = useVietNamGeography();
  const [locations, setLocations] = useState<Location[]>([]);
  const { supabaseClient } = useSessionContext();
  const { orders, totalFee, totalWeight } = useTransferOrdersList();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  console.log(state)
  useEffect(() => {
    const fetchTKLocations = async () => {
      const { data, error } = await supabaseClient
        .from("locations")
        .select("*")
        .eq("type", "tap_ket");
      if (error) {
        console.log(error);
      }
      if (data) {
        setLocations(data);
      }
    };
  
    const fetchGDLocations = async () => {
      const { data, error } = await supabaseClient
        .from("locations")
        .select("*")
        .eq("type", "giao_dich");
      if (error) {
        console.log(error);
      }
      if (data) {
        setLocations(data);
      }
    };
    
  }, []);
  return (
    <Modal isOpen={isOpen} onChange={onChange} className="">
      <DialogHeader>
        <DialogTitle>Transfer Confirmation</DialogTitle>
        <DialogDescription>
          Please confirm the transfer information before send it.
        </DialogDescription>
      </DialogHeader>

      <h2>
        {"You have selected "}
        <span className="text-primary font-bold">
          {orders.filter((o) => o.checked).length + " order(s) "}
        </span>
        to transfer.
      </h2>
      <div className="space-y-1">
        <Label htmlFor="password">Transfer&apos;s Destination</Label>
        <div className="gap-x-2 flex items-center">
          <Select>
            <SelectTrigger className="w-full bg-primary text-primary-foreground">
              <SelectValue
                placeholder="Choose office branch"
                defaultValue={"Hello"}
              />
            </SelectTrigger>
            <SelectContent className="bg-primary text-primary-foreground"></SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </Modal>
  );
}
