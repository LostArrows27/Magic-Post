import { supabaseServer } from "@/utils/supabaseServer";
import { UserSystem } from "@/types/user-context-type";
import { redirect } from "next/navigation";
import { TransferWithParcelData } from "@/types/supabase-table-type";
import AllTransfers from "@/components/transfers-page/AllTransfers";
import { wait } from "@/lib/wait";

export default async function TransfersPage() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = (await supabase.auth.getUser()) as {
    data: {
      user: UserSystem | null;
    };
  };

  let workingLocation;

  if (
    user?.user_metadata.type === "gd_staff" ||
    user?.user_metadata.type === "gd_admin"
  ) {
    workingLocation = `gd_${user?.user_metadata.province?.PROVINCE_ID}_${user?.user_metadata.district?.DISTRICT_ID}`;
  }

  if (
    user?.user_metadata.type === "tk_staff" ||
    user?.user_metadata.type === "tk_admin"
  ) {
    workingLocation = `tk_${user?.user_metadata.province?.PROVINCE_ID}`;
  }

  const { data, error } = await supabase
    .from("transfers")
    .select(
      "*, transfer_details(*, parcels(*)), from:locations!transfers_from_location_id_fkey(*), to:locations!transfers_to_location_id_fkey(*)"
    )
    .or(
      `to_location_id.eq.${workingLocation},from_location_id.eq.${workingLocation}`
    )
    .returns<TransferWithParcelData[]>();

  if (error) {
    console.log(error);
    return redirect("/sign-in");
  }

  return (
    <div className="p-10 pt-6 w-full ">
      <div className="mb-4 flex justify-between w-full">
        <h1 className="font-bold text-3xl ">Manage Transfers</h1>
      </div>
      <div className="bg-background w-full h-full rounded-xl">
        <AllTransfers transfers={data} />
      </div>
    </div>
  );
}
