"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchOrder from "./search-order";
import { Button } from "../ui/button";
import { Location, Parcel } from "@/types/supabase-table-type";
import { useCallback, useEffect, useState, useMemo, use } from "react";
import { Checkbox } from "../ui/checkbox";
import { useTransferOrdersList } from "@/hooks/useTransferOrdersList";
import OrdersTools from "./orders-tools";
import { useTransferConfirmModal } from "@/hooks/useTransferConfirmModal";
import { cn } from "@/lib/utils";
import { useVietNamGeography } from "@/hooks/useVietNamGeography";
import convertLocationIdToString from "@/lib/convertLocationIdToString";
import SearchLocations from "./search-locations";
import LocationsTools from "./locations-tools";
import {
  TransferLocations,
  useTransferLocations,
} from "@/hooks/useTransferLocations";

export default function LocationLists({
  locationsData,
}: {
  locationsData: TransferLocations;
}) {
  const { locations, displayLocations, setDisplayLocations, setLocations } =
    useTransferLocations();
  const { district, ward, province } = useVietNamGeography();


  useEffect(() => {
    setLocations(locationsData);
    setDisplayLocations(locationsData);
  }, [locationsData]);

  return (
    <section className="bg-background w-full rounded-xl h-fit flex flex-col justify-center items-center p-5">
      <div className="flex w-full pb-5  justify-between">
        <SearchLocations />
        <LocationsTools />
      </div>
      <Table>
        <TableCaption className={cn(" font-bold italic")}>
          Please select a location.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Id</TableHead>
            <TableHead className="">Location</TableHead>
            <TableHead className="text-right">Number of Parcels</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayLocations.length > 0 ? (
            displayLocations.map((loc) => {
              return (
                <TableRow key={loc.id}>
                  <TableCell className="max-w-[100px] w-[100px] truncate">
                    {loc.id}
                  </TableCell>
                  <TableCell className=" truncate">
                    {convertLocationIdToString({
                      province,
                      district,
                      ward,
                      locationId: loc.id,
                    })}
                  </TableCell>
                  <TableCell className=" text-right  truncate">
                    {loc.count_parcels}
                  </TableCell>  
                </TableRow>
              );
            })
          ) : (
            <TableRow className=" text text-center font-bold  ">
              <TableCell colSpan={8}>No location found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-auto flex justify-between w-full pt-10 items-center">
      

      </div>
    </section>
  );
}
