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
import { Parcel } from "@/types/supabase-table-type";
import { useCallback, useEffect, useState, useMemo, use } from "react";
import { Checkbox } from "../ui/checkbox";
import { useTransferOrdersList } from "@/hooks/useTransferOrdersList";
import OrdersTools from "./orders-tools";
import {
  TransferState,
  useTransferConfirmModal,
} from "@/hooks/useTransferConfirmModal";
import { cn } from "@/lib/utils";
import { useVietNamGeography } from "@/hooks/useVietNamGeography";
import convertLocationIdToString from "@/lib/convertLocationIdToString";

export default function OrderList({
  parcels,
  type,
}: {
  parcels: (Parcel & {
    checked: boolean;
  })[];
  type: TransferState;
}) {
  const {
    orders,
    displayOrders,
    setDisplayOrders,
    setOrders,
    totalWeight,
    totalFee,
    setTotalFee,
    setTotalWeight,
  } = useTransferOrdersList();
  const { district, ward, province } = useVietNamGeography();

  const { onOpen } = useTransferConfirmModal();
  const [change, setChange] = useState(false);
  const [invalid, setInvalid] = useState(false);
  useEffect(() => {
    //recalculate total weight and total fee
    let totalWeight = 0;

    let totalFee = 0;
    orders.forEach((order) => {
      if (order.checked) {
        totalWeight += order.weight;
        totalFee += order.paid_fee;
      }
    });
    setTotalWeight(totalWeight);
    setTotalFee(totalFee);
  }, [change]);

  useEffect(() => {
    setOrders(parcels);
    setDisplayOrders(parcels);
  }, [parcels]);
  //console log total fee in format 1,000,000 basiccally every 3 digits add a comma

  return (
    <section className="bg-background w-full rounded-xl h-fit flex flex-col justify-center items-center p-5">
      <div className="flex w-full pb-5  justify-between">
        <SearchOrder />
        <OrdersTools />
      </div>
      <Table>
        <TableCaption
          className={cn(" font-bold italic", invalid && "text-red-400")}
        >
          {invalid
            ? "Please select atleast one parcel"
            : "Check the orders you want to transfer"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] ">
              <Checkbox
                className="border-0 shadow-border"
                checked={orders.every((ord) => ord.checked)}
                onCheckedChange={(checked: boolean) => {
                  //check all
                  const newOrders = [...orders];
                  newOrders.forEach((o) => {
                    o.checked = checked;
                  });
                  setOrders(newOrders);
                  setDisplayOrders(newOrders);
                  setChange(!change);
                }}
              />
            </TableHead>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead className="w-[250px]">Description</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Weight (kg)</TableHead>
            <TableHead>Fee (vnd)</TableHead>
            <TableHead className="text-right">Sent Date (GMT+7)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayOrders.length > 0 ? (
            displayOrders.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell className="w-[60px]  ">
                    <Checkbox
                      checked={order.checked}
                      onCheckedChange={(checked: boolean) => {
                        const newOrders = [...orders];
                        newOrders.forEach((o) => {
                          if (order.id === o.id) {
                            o.checked = checked;
                            return;
                          }
                        });
                        setOrders(newOrders);
                        setDisplayOrders(newOrders);
                        setChange(!change);
                      }}
                      className="shadow-border border-0"
                    />
                  </TableCell>
                  <TableCell className="max-w-[100px] w-[100px] truncate">
                    {order.id}
                  </TableCell>
                  <TableCell className=" max-w-[250px] w-[250px] truncate">
                    {order.product_name}
                  </TableCell>
                  <TableCell className=" max-w-[250px] w-[250px] truncate">
                    {order.description}
                  </TableCell>
                  <TableCell className="truncate">
                    {convertLocationIdToString({
                      locationId: order.destination_location_id,
                      district,
                      province,
                      ward,
                    })}
                  </TableCell>
                  <TableCell className="truncate">{order.weight}</TableCell>
                  <TableCell className="truncate">{order.paid_fee}</TableCell>
                  <TableCell className="text-right">
                    {new Date(order.date_sent).toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow className=" text text-center font-bold  ">
              <TableCell colSpan={8}>No order found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-auto flex justify-between w-full pt-10 items-center">
        <div>
          <h2 className="font-bold">
            Total Weight: {totalWeight.toLocaleString()} kg
          </h2>

          <h2 className="font-bold">
            Total Fee: {totalFee.toLocaleString()} vnd
          </h2>
        </div>

        <Button
          className="text-lg"
          size={"lg"}
          variant={invalid ? "destructive" : "default"}
          onClick={() => {
            if (totalWeight === 0) {
              setInvalid(true);
            } else {
              setInvalid(false);
              onOpen(
                type,
                orders.filter((o) => o.checked),
                totalWeight,
                totalFee
              );
            }
          }}
        >
          Confirm
        </Button>
      </div>
    </section>
  );
}
