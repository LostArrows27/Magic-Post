"use client";

import NewStaffAccountModal from "@/components/new-staff-ui/new-staff-account-modal";
import LocationModal from "@/components/location/staff-modal";
import { useState, useEffect } from "react";
import ViewTransferModal from "@/components/view-transfer-modal/ViewTransferModal";

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
    </>
  );
};

export default ModalProviders;
