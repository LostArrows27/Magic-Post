import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Database } from "@/types/supabase-type";
import { tNewStaffSchema } from "@/components/new-staff-ui/new-staff-form";
import { NewStaffSchema } from "@/schema/staff-schema";
import { createClient } from "@supabase/supabase-js";
import { Staff } from "@/types/supabase-table-type";
import { District, Province } from "@/types/geometry-type";
 

export const dynamic = "force-dynamic";
interface UserData {
  email: string;
  password: string;
  email_confirm: boolean;
  user_metadata: {
    province?: Province;
    district?: District;
    type: string;
  };
}
type Body = Staff & {
    province:Province;
    district:District;
}
export async function POST(request: Request) {
  const formData: Body = await request.json();
  

    // console.log(formData.province,typeof formData.district)
  const supabaseRouteHandler = createRouteHandlerClient<Database>({ cookies });

  const full_name = formData.full_name;
  const phone_number = formData.phone_number;
  const home_town = formData.home_town;
  const gender = formData.gender;
  const dob = formData.dob;
  const { data, error } = await supabaseRouteHandler.auth.getUser();

  if (error) return NextResponse.json({ error: error.message });
  if (!data) return NextResponse.json({ error: "User not found" });

  // check role
  const role = data.user.user_metadata.type;

  if (role !== "leader")
    return NextResponse.json({
      error: "You are not authorized to perform this action",
    });

  const work_place_id = "gd_" + formData.province.PROVINCE_ID + "_" + formData.district.DISTRICT_ID;
  const supabase = createClient(
    process.env .NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    {
      auth: {
        autoRefreshToken: false, // All Supabase access is from server, so no need to refresh the token
        detectSessionInUrl: false, // We are not using OAuth, so we don't need this. Also, we are manually "detecting" the session in the server-side code
        persistSession: false, // All our access is from server, so no need to persist the session to browser's local storage
      },
    }
  );
  let email = `admin_${work_place_id}@magic-post.com`;
  let password = `admin_${work_place_id}`;

  const userData: UserData = {
    email,
    password,
    email_confirm: true,
    user_metadata: {
      province: formData.province,
      district: formData.district,
      type: `gd_admin`,
    },
  };
  


  const res = await supabase.auth.admin.createUser(userData);


  const {data:staffData, error: profileError } = await supabaseRouteHandler.from("staffs").insert({
    id: res.data.user!.id,
    full_name,
    home_town,
    phone_number,
    role: `gd_admin`,
    gender,
    dob,
    email,
    
  }).select().single();

    if(!staffData) {
        return NextResponse.json({
            error: profileError?.message,
          });
    }
    const { error:locationError} = await supabaseRouteHandler.from("locations").insert(
        {
            id: work_place_id,
            manager_id: staffData.id,
            province_meta_data: formData.province,
            district_meta_data: formData.district,
            type: "giao_dich",
            province_id: formData.province.PROVINCE_ID,
            district_id: formData.district.DISTRICT_ID,
        }
    )
    const {error:StaffError} = await supabaseRouteHandler.from("staffs").update({
        work_place_id:work_place_id
    }).eq("id",staffData.id)
    

  return NextResponse.json({
    data: { ...res.data, email, password },
    error: res.error?.message || locationError?.message || StaffError?.message,
  });
}
