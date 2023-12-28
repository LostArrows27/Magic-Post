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

  /* Action
    1. xác nhận giao hàng 
    2. xác nhận giao thành công 
    3. xác nhận giao thất bại
    4. xem thông tin hàng 
  */

  /* State
    1. đã nhận từ khách hàng -> kho: 1 + 4
    2. đã nhận từ điểm tập kết đích -> kho: 1 + 4
    3. sẵn sàng giao hàng -> đang giao: 2 + 3 + 4
    4. đã giao -> thành công: 4
    5. đã trả lại điểm tập kết đích: 2 + 4
  */

  if (error) {
    console.log(error);
    return redirect("/");
  }

  return (
    <div className="p-10 pt-6 w-full h-full bg-border">
      <div className="mb-4 flex justify-between w-full">
        <h1 className="font-bold text-3xl ">Manage Orders</h1>
      </div>
      <div className="bg-background w-full h-full rounded-xl">
        <AllOrders parcel={data} />
      </div>
    </div>
  );
}
