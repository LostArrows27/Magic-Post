"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { useVietNamGeography } from "@/hooks/useVietNamGeography";
import { useEffect, useState } from "react";
import { useNewLocations } from "@/hooks/useNewLocations";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useSupabase } from "@/utils/supabaseClient";
import { Location } from "@/types/supabase-table-type";
type newLocationType = {
  provinceId: string;
  districtId: string;
  wardId: string;
};
export default function LocationPicker() {
  const { location, setLocation, type, setType, reset, onClose } =
    useNewLocations();
  const { district, ward, province } = useVietNamGeography();
  const [ownedDistricts, setOwnedDistricts] = useState<Location[]>([]);
  const supabase = useSupabase();
  useEffect(() => {
    if (location.provinceId !== "") {
      (async () => {
        const { data, error } = await supabase
          .from("locations")
          .select("*")
          .eq("province_id", location.provinceId);
        if (error) {
          console.log(error);
        } else {
          setOwnedDistricts(data as Location[]);
        }
      })();
    }
  }, [location]);
  return (
    <>
      <section className="mb-5">
        <div className="space-y-1 ">
          <Label htmlFor="password">Province </Label>
          <div className="gap-x-2 flex items-center">
            {province && (
              <Select
                value={location?.provinceId}
                onValueChange={(value) => {
                  const newLocation = {
                    ...location,
                  };
                  newLocation.provinceId = value;
                  setLocation(newLocation);
                }}
              >
                <SelectTrigger className="w-full bg-primary text-primary-foreground">
                  <SelectValue placeholder="Choose your facility's Province" />
                </SelectTrigger>
                <SelectContent className="bg-primary text-primary-foreground">
                  {province.map((l) => {
                    return (
                      <SelectItem
                        key={l.PROVINCE_ID}
                        value={"" + l.PROVINCE_ID}
                      >
                        {l.PROVINCE_ID + " - " + l.PROVINCE_NAME}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <div className="space-y-1 ">
          <Label htmlFor="password">District </Label>
          <div className="gap-x-2 flex items-center">
            {district && (
              <Select
                value={location?.districtId}
                disabled={location.provinceId === ""}
                onValueChange={(value) => {
                  const newLocation = {
                    ...location,
                  };
                  newLocation.districtId = value;
                  setLocation(newLocation);
                }}
              >
                <SelectTrigger className="w-full bg-primary text-primary-foreground">
                  <SelectValue placeholder="Choose your facility's district" />
                </SelectTrigger>
                <SelectContent className="bg-primary text-primary-foreground">
                  {district
                    .filter(
                      (loc) =>
                        "" + loc.PROVINCE_ID === location.provinceId &&
                        !ownedDistricts.some(
                          (d) => d.district_id === loc.DISTRICT_ID
                        )
                    )
                    .map((l) => {
                      return (
                        <SelectItem
                          key={l.DISTRICT_ID}
                          value={"" + l.DISTRICT_ID}
                        >
                          {l.DISTRICT_ID + " - " + l.DISTRICT_NAME}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </section>
      <DialogFooter className="">
        <Button
          type="button"
          onClick={() => {
            // setType("location");
            onClose();
            reset();
          }}
          variant="secondary"
        >
          {"Close"}
        </Button>
        <Button
          onClick={() => {
            if (
              location.provinceId !== "" &&
              location.districtId !== "" &&
              type === "location"
            ) {
              setType("staff");
            }
          }}
        >
          Continue
        </Button>
      </DialogFooter>
    </>
  );
}
