import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Database, Enums } from "@/types/supabase-type";

import { TransferState } from "@/hooks/useTransferConfirmModal";
import { Parcel } from "@/types/supabase-table-type";
import { TransferLocations } from "@/hooks/useTransferLocations";

export const dynamic = "force-dynamic";
interface NewTransferData {
  state: TransferState;
  seleted: (Parcel & { checked: boolean })[];
  originLocation: string;
  selectedLocation: string;
}
export async function POST(request: Request) {
  const reqData: NewTransferData = await request.json();
  const supabaseRouteHandler = createRouteHandlerClient<Database>({ cookies });

  const state = reqData.state;
  const seleted = reqData.seleted;
  const selectedLocation = reqData.selectedLocation;
  const originLocation = reqData.originLocation;
  const { data, error } = await supabaseRouteHandler.auth.getUser();

  if (error) return NextResponse.json({ error: error.message });
  if (!data) return NextResponse.json({ error: "User not found" });

  // check role
  const role = data.user.user_metadata.type;

  if (role !== "tk_staff" && role !== "gd_staff")
    return NextResponse.json({
      error: "You are not authorized to perform this action",
    });

  // create a transfer record
  const { data: transferData, } =
    await supabaseRouteHandler
      .from("transfers")
      .insert({
        from_location_id: originLocation,
        to_location_id: selectedLocation,
        created_staff: data.user.id,
      })
      .select()
      .single();

    if(!transferData) return NextResponse.json({ error: "Cannot create transfer" });
  // create transfer details
  const { error: transferDetailError } = await supabaseRouteHandler
    .from("transfer_details")
    .insert(
      seleted.map((parcel) => ({
        transfer_id: transferData.id,
        parcel_id: parcel.id,
      }))
    );

  let parcelState: Enums<"parcel_status"> = "đang chuyển đến điểm tập kết gửi";
  if (state === "gd=>tk") {
    parcelState = "đang chuyển đến điểm tập kết gửi";
  } else if (state === "tk=>tk") {
    parcelState = "đang chuyển đến điểm tập kết đích";
  } else if (state === "tk=>gd") {
    parcelState = "đang chuyển đến điểm giao dịch đích";
  }
  //update parcel status

  console.log(seleted,parcelState,selectedLocation)
  const res1 = await Promise.all( seleted.map((parcel) => supabaseRouteHandler.from("parcels").update({ state: parcelState,current_location_id:selectedLocation}).eq("id", parcel.id)));
 

  //update tracking
  const res = await Promise.all(
    seleted.map((parcel) =>
      supabaseRouteHandler.from("trackings").insert({
        parcel_id: parcel.id,
        location_id: selectedLocation,
        status: parcelState,
      })
    )
  );

  return NextResponse.json({success:"You have created a new transfer.", error:  transferDetailError?.message  });
}
