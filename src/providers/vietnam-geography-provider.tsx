"use client";

import { VietNamGeographyWrapper } from "@/hooks/useVietNamGeography";

interface VietnamGeographyProviderProps {
  children: React.ReactNode;
}

const VietnamGeographyProvider = ({
  children,
}: VietnamGeographyProviderProps) => {
  

  return <VietNamGeographyWrapper>{children}</VietNamGeographyWrapper>;
};

export default VietnamGeographyProvider;
