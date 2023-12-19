import { SupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { Location } from '@/types/supabase-table-type';
import { useLocationStore } from '@/hooks/useLocation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';

export default function LocationDisplay({ locationType }: { locationType: string }) {
  const {
    supabaseClient: supabase,
  } = useSessionContext();

  const data: Location[] = [
    {
      created_at: "sada",
      district_id: 2,
      district_meta_data: {},
      id: "sadasda",
      manager_id: "asdasda",
      province_id: 64,
      province_meta_data: {},
      type: "tap_ket"
    },
    {
      created_at: "sada",
      district_id: 2,
      district_meta_data: {},
      id: "sadasda",
      manager_id: "asdasda",
      province_id: 64,
      province_meta_data: {},
      type: "tap_ket"
    },
    {
      created_at: "sada",
      district_id: 2,
      district_meta_data: {},
      id: "sadasda",
      manager_id: "asdasda",
      province_id: 64,
      province_meta_data: {},
      type: "tap_ket"
    },
    {
      created_at: "sada",
      district_id: 2,
      district_meta_data: {},
      id: "sadasda",
      manager_id: "asdasda",
      province_id: 64,
      province_meta_data: {},
      type: "tap_ket"
    },
    {
      created_at: "sada",
      district_id: 2,
      district_meta_data: {},
      id: "sadasda",
      manager_id: "asdasda",
      province_id: 64,
      province_meta_data: {},
      type: "tap_ket"
    },
    {
      created_at: "sada",
      district_id: 2,
      district_meta_data: {},
      id: "sadasda",
      manager_id: "asdasda",
      province_id: 64,
      province_meta_data: {},
      type: "tap_ket"
    }
  ]

  let { locations, isLoading, isError, fetchLocations } = useLocationStore();

  useEffect(() => {
    fetchLocations(locationType, supabase);
  }, [fetchLocations, locationType]);
  
    // locations = data;
    // console.log(locations);
  // const [locations, setLocations] = useState<Location[]>([]);

  // useEffect(() => {
  //   const fetchLocations = async (locationType: string, supabase: SupabaseClient) => {
  //     console.log("hih");
  //       const { data, error } = await supabase
  //         .from("locations")
  //         .select("*")
  //         .eq("type", "tap_ket");
  //         console.log(data);
  
  //       //setLocations(data);
  //   };
  //   fetchLocations(locationType, supabase);
  // }, [locationType]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching locations</div>;
  }

  return (
    <div className='space-y-4'>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {locations.map((item) => (
                <Card key={item.id} className="bg-neutral-100">
                  <CardHeader className="flex flex-row gap-2 items-center justify-start space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Central Hub ID: {item.id}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-bold">Manager ID: {item.manager_id}</div>
                  </CardContent>
                </Card>
            ))}
      </div>
    </div>
  );
};
