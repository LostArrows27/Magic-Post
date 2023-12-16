"use client";

import { useState, useEffect } from "react";

const ModalProviders = () => {
  // Prevent modal open when SSR
  const [isMounted, setisMounted] = useState<boolean>(false);

  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>{/* Add more modal here if you want it to "appear":D */}</>;
};

export default ModalProviders;
