"use client";
import NewStaffAccountModal from "@/components/new-staff-ui/new-staff-account-modal";
import TransferConfirmModal from "@/components/new-transfer/transfer-confirm-modal";
import { useEffect, useState } from "react";

function ModalProviders() {
  // Prevent modal open when SSR
  const [isMounted, setisMounted] = useState<boolean>(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <NewStaffAccountModal />
      <TransferConfirmModal />
    </>
  );
}

export default ModalProviders;
