import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Database } from "@/types/supabase-type";
import { tNewStaffSchema } from "@/components/new-staff-ui/new-staff-form";
import { NewStaffSchema } from "@/schema/staff-schema";
import { createClient } from "@supabase/supabase-js";
 

export const dynamic = "force-dynamic";
interface UserData {
  email: string;
  password: string;
  email_confirm: boolean;
  user_metadata: {
    province?: string;
    district?: string;
    type: string;
  };
}

export async function POST(request: Request) {
  const formData: tNewStaffSchema = await request.json();
  formData.dob = new Date(formData.dob);
  const result = NewStaffSchema.safeParse(formData);
  let zodError = {};
  if (!result.success) {
    result.error.issues.forEach((issue: { path: any[]; message: any }) => {
      zodError = { ...zodError, [issue.path[0]]: issue.message };
    });
    return NextResponse.json({ error: zodError });
  }

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

  if (role !== "tk_admin" && role !== "gd_admin")
    return NextResponse.json({
      error: "You are not authorized to perform this action",
    });

  const provinceId = data.user.user_metadata.province.PROVINCE_ID;
  const department = role.split("_")[0];
  let districtId = null;
  let workplaceId = `${department}_${provinceId}`;
  if (data.user.user_metadata?.district && department === "gd") {
    districtId = data.user.user_metadata.district.DISTRICT_ID;
    workplaceId += `_${districtId}`;
  }

  //check if this user has been created
  const { data: staff } = await supabaseRouteHandler
    .from("staffs")
    .select("*")
    .eq("phone_number", phone_number)
    .maybeSingle();
  if (staff) {
    return NextResponse.json({
      error: "The staff with this phone number has been created before.",
    });
  }

  //get the order of this staff
  const { count } = await supabaseRouteHandler
    .from("staffs")
    .select("id", { count: "exact" })
    .eq("work_place_id", workplaceId)
    .not("role", "eq", role);
  if (count === null) return NextResponse.json({ error: "Error from server" });

  let email = `staff_${department}_${provinceId}_${count + 1}@magic-post.com`;
  let password = `staff_${department}_${provinceId}_${count + 1}`;

  if (districtId && department === "gd") {
    email = `staff_${department}_${provinceId}_${districtId}_${
      count + 1
    }@magic-post.com`;
    password = `staff_${department}_${provinceId}_${districtId}_${count + 1}`;
  }
  const userData: UserData = {
    email,
    password,
    email_confirm: true,
    user_metadata: {
      province: data.user.user_metadata.province,
      type: `${department}_staff`,
    },
  };
  if (districtId && department === "gd") {
    userData.user_metadata.district = data.user.user_metadata.district;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    {
      auth: {
        autoRefreshToken: false, // All Supabase access is from server, so no need to refresh the token
        detectSessionInUrl: false, // We are not using OAuth, so we don't need this. Also, we are manually "detecting" the session in the server-side code
        persistSession: false, // All our access is from server, so no need to persist the session to browser's local storage
      },
    }
  );
  const res = await supabase.auth.admin.createUser(userData);

  const { error: profileError } = await supabase.from("staffs").insert({
    id: res.data.user?.id,
    full_name,
    home_town,
    phone_number,
    role: `${department}_staff`,
    gender,
    dob,
    email,
    work_place_id: workplaceId,
  });

  return NextResponse.json({
    data: { ...res.data, email, password },
    error: res.error?.message || profileError?.message,
  });
}
