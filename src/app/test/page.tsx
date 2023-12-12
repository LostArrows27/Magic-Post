"use client";

import { getAllDistrictList } from "@/actions/get-district-list";
import { getProvinceList } from "@/actions/get-province-list";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// TODO: delete all users
// const {
//   data: { users },
//   error,
// } = await supabase.auth.admin.listUsers({
//   page: 1,
//   perPage: 1000
// })

// // delete all users
// for (let user of users) {
//   const { data, error } = await supabase.auth.admin.deleteUser(user.id);
//   if (error) {
//     console.log(error);
//   }
// }

// TODO: create users
// const { data } = (await viettelAPI.get("/setting/listallprovince")) as {
//   data: Province[];
// };
// // choose provinces that have provice_id devide 3 have remainder 1
// const provinces = data.filter((province) => province.PROVINCE_ID % 3 === 1);
// // create account for each province
// for (let province of provinces) {
//   const { data, error } = await supabase.auth.admin.createUser({
//     email: `${province.VALUE}_${province.PROVINCE_CODE}@gmail.com`,
//     password: "password",
//     email_confirm: true,
//   });
//   if (error) {
//     console.log(error);
//   }
// }

// type Province = {
//   PROVINCE_ID: number;
//   PROVINCE_CODE: string;
//   PROVINCE_NAME: string;
//   VALUE: string;
// };

// type District = {
//   DISTRICT_ID: number;
//   DISTRICT_VALUE: string;
//   DISTRICT_NAME: string;
//   PROVINCE_ID: number;
//   VALUE: string;
// };

const Page = () => {
  const [supabase, setSupabase] = useState(() => {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string
    );
  });
  const handleClick = async () => {
    try {
      // Fetch the first 40 provinces
      const provincesData = await getProvinceList();
      const provinces = provincesData.slice(0, 63);

      for (const province of provinces) {
        // Fetch all districts and filter for the current province
        const allDistrictsData = await getAllDistrictList();
        const districts = allDistrictsData.filter(
          (d) => d.PROVINCE_ID === province.PROVINCE_ID
        );

        // Select 3 random districts from this province
        const selectedDistricts = districts
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        // Create admin account for the province
        await supabase.auth.admin.createUser({
          email: `admin_TK_${province.PROVINCE_ID}@magic-post.com`,
          password: `admin_TK_${province.PROVINCE_ID}`,
          email_confirm: true,
          user_metadata: {
            province: province,
            type: "admin",
            place: "tap_ket",
          },
        });

        // Create an admin account for each district
        for (const district of selectedDistricts) {
          await supabase.auth.admin.createUser({
            email: `admin_GD_${district.DISTRICT_ID}_${province.PROVINCE_ID}@magic-post.com`,
            password: `admin_GD_${district.DISTRICT_ID}_${province.PROVINCE_ID}`,
            email_confirm: true,
            user_metadata: {
              province: province,
              district: district,
              type: "admin",
              place: "giao_dich",
            },
          });
        }
      }

      console.log("All users created successfully");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default Page;
