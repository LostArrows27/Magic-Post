import OrderList from "@/components/new-transfer/order-list";
import { Parcel } from "@/types/supabase-table-type";
import { Database } from "@/types/supabase-type";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function NewTransferPage() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("parcels")
    .select("*")
    .eq("state", "đã nhận từ khách hàng");
  if (error) {
    return (
      <div className="p-10 w-full  pt-6 min-h-full h-fit bg-border flex flex-col ">
        <div className="mb-4 flex justify-between w-full">
          <h1 className="font-bold text-3xl ">Create a Transfer</h1>
        </div>
        <div className="flex-1 bg-background flex justify-center items-center text-xl ">
          {" "}
          There is an error occur.
        </div>
      </div>
    );
  }
  let parcels: (Parcel & { checked: boolean })[] = [];
  if (data) {
    parcels = data.map((parcel) => {
      return {
        ...parcel,
        checked: false,
      };
    });
  }

  return (
    <div className="p-10 w-full  pt-6 min-h-full h-fit bg-border flex flex-col ">
      <div className="mb-4 flex justify-between w-full">
        <h1 className="font-bold text-3xl ">Create a Transfer</h1>
      </div>
      <OrderList parcels={parcels} />
    </div>
  );
}
