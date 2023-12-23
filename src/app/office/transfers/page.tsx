import { supabaseServer } from "@/utils/supabaseServer";
import { UserSystem } from "@/types/user-context-type";
import { redirect } from "next/navigation";
import { TransferWithParcelData } from "@/types/supabase-table-type";
import AllTransfers from "@/components/transfers-page/AllTransfers";

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

  if (user?.user_metadata.type === "gd_staff") {
    workingLocation = `gd_${user?.user_metadata.province?.PROVINCE_ID}_${user?.user_metadata.district?.DISTRICT_ID}`;
  }

  if (user?.user_metadata.type === "tk_staff") {
    workingLocation = `tk_${user?.user_metadata.province?.PROVINCE_ID}`;
  }

  const { data, error } = await supabase
    .from("transfers")
    .select("*, transfer_details(*, parcels(*))")
    .or(
      `to_location_id.eq.${workingLocation},from_location_id.eq.${workingLocation}`
    )
    .returns<TransferWithParcelData[]>();

  if (error) {
    console.log(error);
    return redirect("/sign-in");
  }

  return (
    <div className="p-10 w-full h-full bg-border">
      <div className="bg-background w-full h-full rounded-xl">
        <AllTransfers transfers={data} />
      </div>
    </div>
  );
}
