"use client";

import { Input } from "../ui/input";
import { useTrack } from "@/hooks/useTrack";
import { useEffect, useState } from "react";
import { useParcelId } from "@/hooks/useParcelId";
import { Button } from "../ui/button";
import { IoArrowForwardSharp } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase-type";
import { format } from "date-fns";
import { convertLocationToString } from "@/lib/convertLocationToString";
import { convertLocationID } from "@/lib/convertLocationID";

export function ParcelTrackSection() {
  const [supabase, setSupabase] = useState(() => {
    return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );
  });

  let { tracks, isLoading, isError, fetchTracks, estimatePrice } = useTrack();
  let { parcelId, setParcelId } = useParcelId();

  return (
    <section
      id="search"
      className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20"
    >
      <div className="flex flex-col justify-center items-center gap-1 gap-y-4">
        <div className="flex">
          <h2 className="text-2xl font-bold lg:text-3xl">Track your parcel</h2>
        </div>
        <h2 className="text-lg font-light text-muted-foreground lg:text-2xl">
          Tracking your parcel by enter your parcel ID below.
        </h2>
        <div className="flex items-center w-[700px]">
          <Input
            type="text"
            placeholder="Search something"
            onChange={(e) => {
              e.preventDefault();
              setParcelId(e.target.value);
            }}
            className="pl-4 pr-4 border-primary mt-10 h-14"
          />
        </div>
        <Button
          onClick={async () => {
            await fetchTracks(supabase, parcelId);
          }}
          className="mt-6 w-[200px] p-6 text-xl"
          size={"lg"}
        >
          <span>Tracking</span>
          {isLoading ? (
            <AiOutlineLoading3Quarters className="ml-4 text-2xl animate-spin" />
          ) : (
            <IoArrowForwardSharp className="ml-4 text-2xl" />
          )}
        </Button>
      </div>
      {tracks && (
        <div>
          <div className="p-8 w-[1100px] mt-5 shadow-lg rounded-md shadow-[#888]  bg-white dark:bg-gray-900 dark:shadow-neutral-700 dark:*:text-white">
            <h1 className="text-2xl mb-8 tracking-widest text-left font-semibold">
              ORDER DETAIL
            </h1>
            <div className="w-full flex">
              <div className="w-1/3 space-y-6">
                <div className="flex justify-between">
                  <span className="text-xs">Order ID</span>
                  <span className="text-xs font-bold text-right w-3/5">
                    {tracks?.id.slice(0, 15)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Sender</span>
                  <span className="text-xs font-bold text-right w-3/5">
                    {tracks.sender.full_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Sender Address</span>
                  <span className="text-xs font-bold break-words text-right w-3/5">
                    {tracks.sender.address_meta_data.district.DISTRICT_NAME},{" "}
                    {tracks.sender.address_meta_data.province.PROVINCE_NAME}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Receiver</span>
                  <span className="text-xs font-bold text-right w-3/5">
                    {tracks.receiver.full_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Receiver Address</span>
                  <span className="text-xs font-bold break-words text-right w-3/5">
                    {tracks.receiver.address_meta_data.district.DISTRICT_NAME},{" "}
                    {tracks.receiver.address_meta_data.province.PROVINCE_NAME}
                  </span>
                </div>
              </div>
              <div className=" w-[1px] bg-black mx-7"></div>
              <div className="w-1/3 space-y-6">
                <div className="flex justify-between">
                  <span className="text-xs">Product Name</span>
                  <span className="text-xs font-bold break-words text-right w-3/5">
                    {tracks.product_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Weight</span>
                  <span className="text-xs font-bold break-words text-right w-3/5">
                    {tracks.weight} g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">State</span>
                  <span className="text-xs text-primary underline first-letter:uppercase font-bold break-words text-right w-3/5">
                    {tracks.state}
                  </span>
                </div>
              </div>
              <div className="w-[1px] bg-black mx-7"></div>
              <div className="w-1/3 space-y-6">
                <div className="flex justify-between">
                  <span className="text-xs">Sent Date</span>
                  <span className="text-xs font-bold text-right w-3/5">
                    {format(new Date(tracks.date_sent), "p P")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Estimate Time</span>
                  <span className="text-xs font-bold text-right w-3/5">
                    {estimatePrice ? estimatePrice.split("VND -")[1] : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Estimate Fee </span>
                  <span className="text-xs font-bold text-right w-3/5">
                    {tracks.paid_fee} VND
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 w-[1100px] relative mt-5 shadow-lg shadow-[#888] flex flex-col rounded-md bg-white dark:bg-gray-900 dark:shadow-neutral-700 dark:*:text-white">
            <div className="relative">
              <div className="absolute top-0 left-[6px] bottom-0 w-[1px] h-full center">
                <div className="w-[1px] h-[calc(100%-44px)] bg-gray-400"></div>
              </div>
              {tracks.trackings.map((tracking, index) => (
                <div
                  key={index}
                  className="text-base relative flex flex-col gap-y-1 items-start py-4 pl-14  "
                >
                  <div className="absolute z-10 top-0 left-0">
                    {index === 0 ? (
                      <div className="size-5 absolute -left-1 top-5 border center dark:border-white rounded-full border-primary">
                        <div className="size-3 rounded-full bg-primary dark:bg-white"></div>
                      </div>
                    ) : (
                      <div className="size-4 absolute -left-[1px] top-5 bg-gray-300 center rounded-full"></div>
                    )}
                  </div>
                  <div className="text-primary font-bold first-letter:capitalize">
                    {tracking.status}
                  </div>
                  <div className="text-sm">
                    {format(new Date(tracking.created_at), "P p")}
                    {": "}
                    {convertLocationID(tracking.locations.id)}
                    {", "}
                    {convertLocationToString(tracking.locations)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
