"use client";

import NewStaffAccountModal from "@/components/new-staff-ui/new-staff-account-modal";
import LocationModal from "@/components/location/location-modal";
import { useState, useEffect } from "react";

const ModalProviders = () => {
  // Prevent modal open when SSR
  const [isMounted, setisMounted] = useState<boolean>(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <LocationModal/>
      <NewStaffAccountModal/>
    </>
  )
};

export default ModalProviders;
