import { getAllDistrictList } from "@/actions/get-district-list";
import { getProvinceList } from "@/actions/get-province-list";
import { getAllWardList } from "@/actions/get-ward-list";
import { VietNamGeography } from "@/types/vietnam-geography-type";
import { createContext, useContext, useEffect, useState } from "react";

export const VietnamGeographyContext = createContext<
  VietNamGeography | undefined
>(undefined);

export interface Props {
  [propName: string]: any;
}

export const VietNamGeographyWrapper = (props: Props) => {
  const [vietnamGeography, setVietnamGeography] = useState<Omit<
    VietNamGeography,
    "isLoading"
  > | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVietNamGeography = async () => {
      setIsLoading(true);
      const getProvince = getProvinceList();
      const getDistrict = getAllDistrictList();
      const getWard = getAllWardList();

      const [province, district, ward] = await Promise.all([
        getProvince,
        getDistrict,
        getWard,
      ]);

      setIsLoading(false);

      setVietnamGeography({
        province,
        district,
        ward,
      });
    };
    fetchVietNamGeography();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    province: vietnamGeography?.province || [],
    district: vietnamGeography?.district || [],
    ward: vietnamGeography?.ward || [],
    isLoading: isLoading,
  };

  // console.log(value);

  return (
    <VietnamGeographyContext.Provider
      value={value}
      {...props}
    ></VietnamGeographyContext.Provider>
  );
};

export const useVietNamGeography = () => {
  const context = useContext(VietnamGeographyContext);

  if (context === undefined) {
    throw new Error(
      "useVietNamGeography must be used within a VietNamGeographyProvider"
    );
  }
  return context;
};
