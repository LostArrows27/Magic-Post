"use client"

import { useSessionContext } from "@supabase/auth-helpers-react";
import { Input } from "../ui/input";
import { useTrack } from "@/hooks/useTrack";
import { useEffect, useState } from "react";
import { useParcelId } from "@/hooks/useParcelId";

export function ParcelTrackSection() {
    let parcel_id = "15f27b82-7665-4507-967d-3204a6a323c3";

    const {
      supabaseClient: supabase,
    } = useSessionContext();
  
    let { tracks, isLoading, isError, fetchTracks } = useTrack();
    let { parcelId, setParcelId} = useParcelId();
  
    useEffect(() => {
      fetchTracks(supabase, parcelId);
      console.log(parcelId);
    }, [parcelId]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    // if (isError) {
    //   return <div>Error fetching tracks</div>;
    // }

    return (
    <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20">
        <div className="space-y-4 flex flex-col justify-center items-center gap-1">
            <div className="flex">
                <h2 className="text-lg font-light text-muted-foreground lg:text-3xl">
                    Track your parcel
                </h2>
            </div>
            <div className="flex items-center w-96">
                <Input
                type="text"
                placeholder="Search something"
                onChange={(e) => {
                    e.preventDefault();
                    setParcelId(e.target.value);
                }}
                className="pl-4 pr-4"
                />
            </div>
        </div>
    </section>
    )
}