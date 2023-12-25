"use client"

import LocationDisplay from "@/components/location/location-display";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useVietNamGeography } from "@/hooks/useVietNamGeography";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";

export default function HubPage() {
    const { province } = useVietNamGeography();

    const [selectedZone, setSelectedZone] = useState("All");

    return (
      <div className="hidden flex-col md:flex fade-in">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Hub Manager</h2>
          </div>
          <div className="space-y-4">
            <Tabs defaultValue="central-hub" className="">
              <div className="flex justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="central-hub">Central Hub</TabsTrigger>
                  <TabsTrigger value="hub">Hub</TabsTrigger>
                </TabsList>
                <div className='flex gap-2 fade-in'>
                  <Select onValueChange={(value) => {setSelectedZone(value)}} defaultValue="All">
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Select a zone" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        {province?.map((zone) => (
                          <SelectItem key={zone.PROVINCE_ID} value={zone.PROVINCE_ID.toString()}>{zone.PROVINCE_NAME}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator/>
              <TabsContent value="central-hub" className="">
                <LocationDisplay locationType="tap_ket" selectedZone={selectedZone}/>
              </TabsContent>
              <TabsContent value="hub">
                <LocationDisplay locationType="giao_dich" selectedZone={selectedZone}/>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
}