"use client";

import NewStaffAccountModal from "@/components/new-staff-ui/new-staff-account-modal";
import LocationModal from "@/components/location/staff-modal";
import { useState, useEffect } from "react";
import TransferConfirmModal from "@/components/new-transfer/transfer-confirm-modal";
import ViewTransferModal from "@/components/view-transfer-modal/ViewTransferModal";
import ViewParcelInformation from "@/components/new-transfer/view-parcel-informations";

const ModalProviders = () => {
  // Prevent modal open when SSR
  const [isMounted, setisMounted] = useState<boolean>(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ViewTransferModal />
      <LocationModal />
      <NewStaffAccountModal />
      <TransferConfirmModal />
      <ViewParcelInformation />
    </>
  );
};

export default ModalProviders;
