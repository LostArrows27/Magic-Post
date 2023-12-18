import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Database } from "@/types/supabase-type";
import { tNewStaffSchema } from "@/components/new-staff-form";
import { NewStaffSchema } from "@/schema/staff-schema";
import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData: tNewStaffSchema = await request.json();
  const result = NewStaffSchema.safeParse(formData);
  console.log(typeof formData.dob)
//   let zodError = {};
//   if (!result.success) {
//     result.error.issues.forEach((issue: { path: any[]; message: any }) => {
//       zodError = { ...zodError, [issue.path[0]]: issue.message };
//     });
//     return NextResponse.json({ error: zodError });
//   }
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//     process.env.SUPABASE_SERVICE_ROLE_KEY as string
//   );
//   const full_name = formData.full_name;
//   const phone_number = formData.phone_number;
//   const home_town = formData.home_town;
//   const gender = formData.gender;
//   const  dob = format(formData.dob, "yyyy-MM-dd");
//     console.log(dob)
//   const { data, error } = await supabase.auth.getUser();

//   if (error) return NextResponse.json({ error: error.message });
//   if (!data) return NextResponse.json({ error: "User not found" });

//   // check role
//   const role = data.user.user_metadata.type;
//   if (role !== "tk_admin" || role !== "gd_admin")
//     return NextResponse.json({
//       error: "You are not authorized to perform this action",
//     });

//     if(!data.user.user_metadata?.district) {
//         return NextResponse.json({ error: "You are not in charge of this actions" });
//     }
//   const districtId = data.user.user_metadata.district.DISTRICT_ID;
//   const provinceId = data.user.user_metadata.province.PROVINCE_ID;
//   const department = role.split("_")[0];
//   const workplaceId = `${department}_${data.user.user_metadata.province.PROVINCE_ID}_${data.user.user_metadata.district.DISTRICT_ID}`;

//   //check if this user has been created
//   const {data:staff} = await supabase.from('staff').select('*').eq('phone_number', phone_number).maybeSingle();
//   if(staff) {
//     return NextResponse.json({error: 'The staff with this phone number has been created before.'})
//   }

//   const { count } = await supabase
//     .from("staff")
//     .select("id", { count: "exact" })
//     .eq("work_place_id", workplaceId);
//   if (count === null) return NextResponse.json({ error: "Error" });

//   const email = `staff_${department}_${provinceId}_${districtId}_${
//     count + 1
//   }@magic_post.com`;
//   const password = `staff_${department}_${provinceId}_${districtId}_${
//     count + 1
//   }`;

//   const res = await supabase.auth.admin.createUser({
//     email,
//     password,
//     email_confirm: true,
//     user_metadata: {
//       province: data.user.user_metadata.province,
//       district: data.user.user_metadata.district,
//       type: `${department}_staff`,
//     },
//   });

//   await supabase.from('staffs').insert({
//     full_name,
//     home_town,
//     phone_number,
//     role: `${department}_staff`,
//     gender,
//     dob,
//     work_place_id: workplaceId,
//   })



  return NextResponse.json("hello");
}
