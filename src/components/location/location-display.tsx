import { useSessionContext } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { useLocation } from '@/hooks/useLocation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function LocationDisplay({ locationType }: { locationType: string }) {
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {locations.map((item) => (
                <Card key={item.id} className="bg-neutral-100">
                  <CardHeader className="flex flex-row gap-2 items-center justify-start space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {locationType === "tap_ket" ? (
                        <>
                        Central Hub ID: {item.id}
                        </>
                      ) : (
                        <>
                        Hub ID: {item.id}
                        </>
                      )}
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
