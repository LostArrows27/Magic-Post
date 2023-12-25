"use client"

import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { useLocation } from '@/hooks/useLocation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import LocationDetail from './location-detail';
import { useLocationDetail } from '@/hooks/useLocationDetail';
import { cn } from '@/lib/utils';

export default function LocationDisplay({ locationType, selectedZone }: { locationType: string, selectedZone: string }) {
  const { isOpen, onOpen } = useLocationDetail();
    
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
      <div className={cn(
        `fade-in mt-4`,
        !isOpen ? "" : "hidden"
      )}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 fade-in">
              {locations.map((item) => (
                selectedZone === "All" || selectedZone === item.province_meta_data.PROVINCE_ID.toString()) && (
                  <Card key={item.id} className="bg-border">
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
                      <p className='text-sm font-semibold'>
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
                      <p className="text-sm font-semibold">Manager: {item.staffs.full_name}</p>
                    </CardContent>
                    <Button 
                      onClick={() => {
                        onOpen(item.staffs, item.id, item.type);
                      }}
                      variant="link"
                      className='pl-6 mb-4'
                    >
                      See more details
                    </Button>
                  </Card>
              ))}
        </div>
      </div>
      <div>
        <LocationDetail/>
      </div>
    </div>
  );
};
