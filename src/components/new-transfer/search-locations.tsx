import { useTransferOrdersList } from "@/hooks/useTransferOrdersList";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { TransferLocations, useTransferLocations } from "@/hooks/useTransferLocations";

export default function SearchLocations() {
  const { locations, displayLocations, setDisplayLocations, setLocations } =
    useTransferLocations();
  const [searchValue, setSearchValue] = useState("");
  //filter orders

  useEffect(() => {
    //search order by name or id but when delete all it return to original

    if (searchValue !== "") {
        const lo =locations[0] 
      const newLocations = locations.filter((loc) => {
        return (
          loc.id.toLowerCase().includes(searchValue.toLowerCase()) 
        );
      });
      setDisplayLocations(newLocations);
    } else {
        setDisplayLocations(locations);
    }
  }, [searchValue]);
  return (
    <Input
      placeholder="Search locations..."
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
      className="w-[300px] border-primary"
    />
  );
}
