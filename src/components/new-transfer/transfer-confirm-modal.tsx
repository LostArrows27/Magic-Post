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
import convertLocationIdToString from "@/lib/convertLocationIdToString";
import axios from "axios";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useTransferLocations } from "@/hooks/useTransferLocations";

export default function TransferConfirmModal() {
  const { isOpen, onClose, state, seleted } = useTransferConfirmModal();
  const { userDetails } = useUser();
  const { district, ward, province } = useVietNamGeography();
  const [locations, setLocations] = useState<Location[]>([]);
  const { supabaseClient } = useSessionContext();
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const {setSelectedLocation:setLocationTK} = useTransferLocations();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (userDetails) {
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
          .eq("type", "giao_dich")
          .eq(
            "province_id",
            (userDetails.work_place_id as string).split("_")[1]
          );
        if (error) {
          console.log(error);
        }
        if (data) {
          setLocations(data);
        }
      };

      if (state === "gd=>tk" || state === "tk=>tk") {
        fetchTKLocations();
      }
      if (state === "tk=>gd") {
        fetchGDLocations();
      }
    }
  }, [state, userDetails]);

  useEffect(() => {
    if (state === "gd=>tk") {
      setSelectedLocation(`tk_${userDetails?.work_place_id?.split("_")[1]}`);
    }
  }, [state]);
  const handleConfirmTransfer = async () => {
    setLoading(true);
    const res = await axios.post("/api/new-transfer", {
      state,
      seleted,
      originLocation: userDetails?.work_place_id,
      selectedLocation,
    });

    if (res.data.error) {
      toast.error(res.data.error);
    }
    if (res.data.success) {
      router.refresh()
      setLocationTK(null)
      toast.success(res.data.success);
      onClose();
    }

    setLoading(false);
  };
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
          {seleted.length + " order(s) "}
        </span>
        to transfer.
      </h2>
      <div className="space-y-1 ">
        <Label htmlFor="password">Transfer&apos;s Destination</Label>
        <div className="gap-x-2 flex items-center">
          <Select
            value={selectedLocation}
            disabled={state === "gd=>tk" ? true : false}
            onValueChange={(value) => {
              setSelectedLocation(value);
            }}
          >
            <SelectTrigger className="w-full bg-primary text-primary-foreground">
              <SelectValue placeholder="Choose office branch" />
            </SelectTrigger>
            <SelectContent className="bg-primary text-primary-foreground">
              {locations.map((location) => {
                return (
                  <SelectItem key={location.id} value={location.id}>
                    {location.id +
                      " - " +
                      convertLocationIdToString({
                        locationId: location.id,
                        district,
                        ward,
                        province,
                      })}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <h2></h2>
      <DialogFooter className="">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button onClick={handleConfirmTransfer} disabled={loading}>
          Confirm{" "}
          {loading && (
            <AiOutlineLoading3Quarters className="animate-spin  ml-3" />
          )}
        </Button>
      </DialogFooter>
    </Modal>
  );
}
