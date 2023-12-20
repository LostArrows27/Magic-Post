"use client"

import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useLocation } from '@/hooks/useLocation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useLocationModal } from '@/hooks/useLocationModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LocationDisplay({ locationType }: { locationType: string }) {
  const { onOpen } = useLocationModal();

  const [selectedZone, setSelectedZone] = useState("All");
  
  const {
    supabaseClient: supabase,
  } = useSessionContext();

  let { locations, isLoading, isError, fetchLocations } = useLocation();

  useEffect(() => {
    fetchLocations(locationType, supabase);
  }, [fetchLocations, locationType]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching locations</div>;
  }

  return (
    <div className='space-y-4'>
      <Select onValueChange={(value) => {setSelectedZone(value)}} defaultValue="All">
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a zone" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="All">Province ID: All</SelectItem>
            <SelectItem value="63">Province ID: 63</SelectItem>
            <SelectItem value="62">Province ID: 62</SelectItem>
            <SelectItem value="61">Province ID: 61</SelectItem>
            <SelectItem value="60">Province ID: 60</SelectItem>
            <SelectItem value="59">Province ID: 59</SelectItem>
        </SelectContent>
      </Select>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {locations.map((item) => (selectedZone === "All" || selectedZone === item.province_meta_data.PROVINCE_ID.toString()) && (
                <Card key={item.id} className="bg-neutral-100 cursor-pointer">
                  <CardHeader className="flex flex-row gap-2 items-center justify-start space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      <div className="text-xl font-bold">
                        <p>
                        {item.province_meta_data.PROVINCE_NAME} ({item.province_meta_data.PROVINCE_CODE}-{item.province_meta_data.PROVINCE_ID})
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='flex flex-col gap-2'>
                    <p className='text-sm'>
                      {locationType === "tap_ket" ? (
                        <>
                        Central Hub ID: {item.id}
                        </>
                      ) : (
                        <>
                        Hub ID: {item.id}
                        </>
                      )}
                    </p>
                    <p className="text-sm">Manager: {item.staffs.full_name}</p>
                  </CardContent>
                  <Button 
                    onClick={() => {
                      onOpen();
                      console.log("Button clicked");
                    }}
                    variant="link"
                    className='pl-6 pb-2'
                  >
                    See more details
                  </Button>
                </Card>
            ))}
      </div>
    </div>
  );
};
