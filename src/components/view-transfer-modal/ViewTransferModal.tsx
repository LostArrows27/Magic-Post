"use client";

import { ImTruck } from "react-icons/im";
import { FaBoxOpen, FaCalendarAlt, FaCheckSquare } from "react-icons/fa";
import Modal from "../modals/Modal";
import { useViewTransferModal } from "@/hooks/useViewTransferModal";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { convertLocationToString } from "@/lib/convertLocationToString";
import { convertTransferState } from "@/lib/convertTransferState";
import { useUser } from "@/hooks/useUser";
import { convertLocationID } from "@/lib/convertLocationID";
import { FaLocationDot } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { convertConfirmTransferState } from "@/lib/convertConfirmTransferState";
import { ParcelStatus } from "@/types/supabase-table-type";
import { useSupabase } from "@/utils/supabaseClient";

const ViewTransferModal = () => {
  const { isOpen, onClose, transfer } = useViewTransferModal();

  const [loading, setLoading] = useState(false);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const router = useRouter();

  const supabaseClient = useSupabase();

  const { workLocation, userDetails } = useUser();

  if (!transfer) return null;
  const canVerified =
    !transfer?.has_verfied && transfer?.to.id === workLocation.id;


  const handleVerified = async () => {
    if (!canVerified) return;
    try {
      setLoading(true);

      const updateTransfer = supabaseClient
        .from("transfers")
        .update({
          has_verfied: true,
          date_verified: new Date().toISOString(),
          verified_staff: userDetails?.id,
        })
        .eq("id", transfer.id);

      const updateParcelsData = transfer.transfer_details.map((data) => {
        return supabaseClient
          .from("parcels")
          .update({
            state: convertConfirmTransferState(transfer.from, transfer.to),
            current_location_id: workLocation.id,
          })
          .eq("id", data.parcels.id);
      });

      const createTracking = transfer.transfer_details.map((data) => {
        return supabaseClient.from("trackings").insert({
          parcel_id: data.parcels.id,
          location_id: workLocation.id,
          status: convertConfirmTransferState(
            transfer.from,
            transfer.to
          ) as ParcelStatus,
        });
      });

      const response = await Promise.all([
        updateTransfer,
        ...updateParcelsData,
        ...createTracking,
      ]);

      response.map((res) => {
        if (res.error) {
          throw res.error;
        }
      });

      setLoading(false);
      onClose();
      toast.success("Verified Transfer Successfully");
      router.refresh();
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      className="max-w-[700px] max-h-[900px] overflow-hidden p-8 !rounded-2xl remove-button"
    >
      <DialogHeader>
        <DialogTitle className="text-2xl">Transfer Detail</DialogTitle>
      </DialogHeader>
      <div className="w-full mt-4 flex flex-col gap-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <FaCalendarAlt className="text-lg text-yellow-600" />
            <div className="font-bold">Transfered Date</div>
          </div>
          <div className="max-w-3/5 break-words">
            {format(new Date(transfer.date_transferred), "p P")}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <ImTruck className="text-lg text-green-600" />
            <div className="font-bold">From</div>
          </div>
          <div className="max-w-3/5 break-words">
            {convertLocationID(transfer.from.id)},{" "}
            {convertLocationToString(transfer.from)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <FaLocationDot className="text-lg text-blue-600" />
            <div className="font-bold">To</div>
          </div>
          <div className="max-w-3/5 break-words">
            {convertLocationID(transfer.to.id)},{" "}
            {convertLocationToString(transfer.to)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <FaBoxOpen className="text-lg text-red-600" />
            <div className="font-bold">Status</div>
          </div>
          <div className="max-w-3/5 *:text-sm break-words">
            {convertTransferState(transfer, workLocation.id)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <FaCheckSquare className="text-lg text-pink-600" />
            <div className="font-bold">Verified Date</div>
          </div>
          <div className="max-w-3/5 break-words">
            {transfer.date_verified
              ? format(new Date(transfer.date_verified), "p P")
              : "null"}
          </div>
        </div>
      </div>
      <Separator className="my-3" />
      <div className="center flex-col gap-y-5">
        {transfer.transfer_details.map((data, index) => (
          <div
            className="w-full flex justify-between min-h-10 p-5 bg-primary-foreground rounded-lg"
            key={index}
          >
            <div className="font-semibold w-4/5">
              {data.parcels.product_name}
            </div>
            <div className="flex items-center">
              {data.parcels.weight} <span className="font-bold ml-1">g</span>
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-3" />
      {canVerified && (
        <div className="flex gap-x-3 justify-end w-full">
          <Button
            onClick={() => {
              onClose();
            }}
            variant={"outline"}
          >
            Cancel
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={loading}>Verified</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Please ensure that all the parcels have delivered to your
                  location !
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={loading}
                  onClick={async (e) => {
                    e.preventDefault();
                    await handleVerified();
                  }}
                >
                  Verified
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </Modal>
  );
};

export default ViewTransferModal;
