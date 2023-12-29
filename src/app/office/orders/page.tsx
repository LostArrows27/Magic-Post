import AllOrders from "@/components/order-page/AllOrder";
import { Parcel } from "@/types/supabase-table-type";
import { UserSystem } from "@/types/user-context-type";
import { supabaseServer } from "@/utils/supabaseServer";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = (await supabase.auth.getUser()) as {
    data: {
      user: UserSystem | null;
    };
  };

  let workingLocation = `gd_${user?.user_metadata.province?.PROVINCE_ID}_${user?.user_metadata.district?.DISTRICT_ID}`;

  const { data, error } = await supabase
    .from("parcels")
    .select("*")
    .eq("current_location_id", workingLocation)
    .neq("state", "đang chuyển đến điểm giao dịch đích")
    .returns<Parcel[]>();

  if (error) {
    console.log(error);
    return redirect("/");
  }

  return (
    <div className="p-10 w-full h-full pt-6 bg-border">
      <div className="mb-4 flex justify-between w-full">
        <h1 className="font-bold text-3xl ">Manage Orders</h1>
      </div>
      <div className="bg-background w-full h-fit rounded-xl">
        <AllOrders parcel={data} />
      </div>
    </div>
  );
}
