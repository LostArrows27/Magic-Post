"use server";
import OrderList from "@/components/new-transfer/order-list";
import TransferPageError from "@/components/new-transfer/transfer-page-error";
import { Parcel } from "@/types/supabase-table-type";
import { Database } from "@/types/supabase-type";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@supabase/supabase-js";
import LocationLists from "@/components/new-transfer/locations-lists";
import { TransferLocations } from "@/hooks/useTransferLocations";

export default async function NewTransferPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );
   const supabaseServer = createServerComponentClient<Database>({cookies});
  const { data } = await supabaseServer.auth.getUser();
  let parcels1: (Parcel & { checked: boolean })[] = [];
  let parcels2: (Parcel & { checked: boolean })[] = [];
  let locations1: TransferLocations = [];
  let locations2: TransferLocations = [];

  const user_role = data.user?.user_metadata.type;

  if (user_role === "gd_staff") {
    try {
      const department = user_role.split("_")[0];
      const province = data.user?.user_metadata.province.PROVINCE_ID;
      const district = data.user?.user_metadata.district.DISTRICT_ID;

      const { data: parcels1Data, error: error1 } = await supabase
        .from("parcels")
        .select("*")
        .eq("current_location_id", `${department}_${province}_${district}`)
        .eq("state", "đã nhận từ khách hàng");
      if (error1) {
        throw error1;
      }
      if (parcels1Data) {
        parcels1 = parcels1Data.map((parcel) => {
          return {
            ...parcel,
            checked: false,
          };
        });
      }
      const { data: parcels2Data, error: error2 } = await supabase
        .from("parcels")
        .select("*")
        .eq("current_location_id", `${department}_${province}_${district}`)
        .eq("state", "sẵn sàng giao hàng");
      if (error2) {
        throw error2;
      }
      if (parcels2Data) {
        parcels2 = parcels2Data.map((parcel) => {
          return {
            ...parcel,
            checked: false,
          };
        });
      }
    } catch (error) {
      return <TransferPageError />;
    }
  } else if (user_role === "tk_staff") {
    try {
      const department = user_role.split("_")[0];
      const province = data.user?.user_metadata.province.PROVINCE_ID;

      let { data: locations1Data, error: error1 } = await supabase.rpc(
        "get_destination_parcels_from_gd",
        {
          current_location_id_param: `${department}_${province}`,
        }
      );

      if (locations1Data) {
        locations1 = locations1Data.map((parcel: Parcel) => {
          return {
            ...parcel,
            checked: false,
          };
        });
      }
      if (error1) {
        throw error1;
      }
      const { data: locations2Data, error: error2 } = await supabase.rpc(
        "get_destination_parcels_from_tk",
        {
          current_location_id_param: `${department}_${province}`,
        }
      );
      if (error2) {
        throw error2;
      }
      if (locations2Data) {
        locations2 = locations2Data.map((parcel: Parcel) => {
          return {
            ...parcel,
            checked: false,
          };
        });
      }
    } catch (error) {
      console.log(error);
      return <TransferPageError />;
    }
  }
  if (user_role === "gd_staff") {
    return (
      <div className="p-10 w-full  pt-6 min-h-full h-fit bg-border flex flex-col ">
        <Tabs defaultValue="customers" className="w-full">
          <div className="flex">
            <div className="mb-4 flex justify-between w-full">
              <h1 className="font-bold text-3xl ">Create a Transfer</h1>
            </div>
            <TabsList className="w-[300px] p-[6px] h-fit ">
              <TabsTrigger
                className="flex-1 text-base font-bold"
                value="customers"
              >
                Customers
              </TabsTrigger>
              <TabsTrigger
                className="flex-1 text-base font-bold"
                value="warehouse"
              >
                WareHouse
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="customers">
            <OrderList parcels={parcels1} />
          </TabsContent>
          <TabsContent value="warehouse">
            <OrderList parcels={parcels2} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (user_role === "tk_staff") {
    return (
      <div className="p-10 w-full  pt-6 min-h-full h-fit bg-border flex flex-col ">
        <Tabs defaultValue="hub" className="w-full">
          <div className="flex">
            <div className="mb-4 flex justify-between w-full">
              <h1 className="font-bold text-3xl ">Create a Transfer</h1>
            </div>
            <TabsList className="w-[300px] p-[6px] h-fit ">
              <TabsTrigger
                className="flex-1 text-base font-bold"
                value="hub"
              >
                 Hub
              </TabsTrigger>
              <TabsTrigger
                className="flex-1 text-base font-bold"
                value="central-hub"
              >
                Central Hub
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="hub">
            <LocationLists locationsData={locations1} />
          </TabsContent>
          <TabsContent value="central-hub">
            <LocationLists locationsData={locations2} />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return <TransferPageError />;
}
