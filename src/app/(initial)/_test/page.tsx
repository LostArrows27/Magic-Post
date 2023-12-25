"use client";

import { getAllDistrictList } from "@/actions/get-district-list";
import { getProvinceList } from "@/actions/get-province-list";
import { getSubwardBasedOnWard } from "@/actions/get-subward-based-on-ward";
import { getAllWardList } from "@/actions/get-ward-list";
import { generateFakePhoneNumber } from "@/lib/randomPhoneNumber";
import { randomVietnameseName } from "@/lib/randomVietnameseName";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// NOTE: create fake data for staffs table

// try {
//   const {
//     data: { users },
//     error,
//   } = await supabase.auth.admin.listUsers({
//     page: 1,
//     perPage: 1000,
//   });
//   const province = (await getProvinceList()) as Province[];
//   const district = (await getAllDistrictList()) as District[];
//   const ward = (await getAllWardList()) as Ward[];
//   for (let user of users) {
//     // 1. full_name
//     // 2. work_place
//     // 3. phone_number
//     // 4. home_town "province_district_ward"
//     // 5. age "20-50"
//     // 6. gender (male / female)
//     // 7. role ('leader', 'tk_admin', 'gd_admin', 'tk_staff', 'gd_staff')
//     const phone_number = generateFakePhoneNumber();
//     const work_place_id = user.email!.split("@")[0].replace("admin_", "");
//     const age = Math.floor(Math.random() * (50 - 20 + 1) + 20);
//     const gender = Math.random() < 0.5 ? "male" : "female";
//     const full_name = randomVietnameseName(gender);

//     const role =
//       user.user_metadata!.type === "admin_TK" ? "tk_admin" : "gd_admin";

//     const randomProvince =
//       province[Math.floor(Math.random() * province.length)];

//     const randomDistrictByProvince = district.filter(
//       (d) => d.PROVINCE_ID === randomProvince.PROVINCE_ID
//     );

//     const randomDistrict =
//       randomDistrictByProvince[
//         Math.floor(Math.random() * randomDistrictByProvince.length)
//       ];

//     const randomWardByDistrict = ward.filter(
//       (w) => w.DISTRICT_ID === randomDistrict.DISTRICT_ID
//     );

//     let home_town = "";

//     if (randomWardByDistrict.length === 0) {
//       home_town = `${randomDistrict.DISTRICT_NAME}, ${randomProvince.PROVINCE_NAME}`;
//     } else {
//       const randomWard =
//         randomWardByDistrict[
//           Math.floor(Math.random() * randomWardByDistrict.length)
//         ];

//       const subWard = await getSubwardBasedOnWard(randomWard.LOCATION_CODE);

//       if (subWard.length === 0) {
//         home_town = `${randomWard.WARDS_NAME}, ${randomDistrict.DISTRICT_NAME}, ${randomProvince.PROVINCE_NAME}`;
//       } else {
//         const getRandomSubWard =
//           subWard[Math.floor(Math.random() * subWard.length)];

//         home_town = `${getRandomSubWard.name}, ${randomWard.WARDS_NAME}, ${randomDistrict.DISTRICT_NAME}, ${randomProvince.PROVINCE_NAME}`;
//       }
//     }

//     const datas = {
//       id: user.id,
//       phone_number,
//       home_town,
//       work_place_id,
//       age,
//       gender,
//       full_name,
//       role,
//     };

//     const { data, error } = await supabase.from("staffs").insert(datas);

//     if (error) {
//       throw error;
//     }
//   }
// } catch (error) {
//   console.error("An error occurred:", error);
// }

// NOTE: create location based on admin

// try {
//   const {
//     data: { users },
//     error,
//   } = await supabase.auth.admin.listUsers({
//     page: 1,
//     perPage: 1000,
//   });

//   for (let user of users) {
//     const type =
//       user.user_metadata!.type === "admin_TK" ? "tap_ket" : "giao_dich";

//     // cut part before @ in email + remove "admin"
//     const id = user.email!.split("@")[0].replace("admin_", "");

//     const province_id = user.user_metadata!.province.PROVINCE_ID;
//     const province_meta_data = user.user_metadata!.province;

//     if (type === "giao_dich") {
//       const district_id = user.user_metadata!.district.DISTRICT_ID;
//       const district_meta_data = user.user_metadata!.district;
//       let datas = {
//         id,
//         type: type,
//         province_id,
//         district_id,
//         province_meta_data,
//         district_meta_data,
//       };
//       const { data, error } = await supabase
//         .from("locations")
//         .insert(datas);

//       if (error) {
//         throw error;
//       }
//     } else {
//       let datas = {
//         id,
//         type: type,
//         province_id,
//         province_meta_data,
//       };
//       const { data, error } = await supabase
//         .from("locations")
//         .insert(datas);
//     }
//   }
//   console.log("All users created successfully");
// } catch (error) {
//   console.error("An error occurred:", error);
// }

// NOTE: create admin account for each province and district
// try {
//   // Fetch all provinces
//   const provincesData = await getProvinceList();
//   const provinces = provincesData.slice(0, 63);

//   for (const province of provinces) {
//     // Fetch all districts and filter for the current province
//     const allDistrictsData = await getAllDistrictList();
//     const districts = allDistrictsData.filter(
//       (d) => d.PROVINCE_ID === province.PROVINCE_ID
//     );

//     // Select 3 random districts from this province
//     const selectedDistricts = districts
//       .sort(() => 0.5 - Math.random())
//       .slice(0, 3);

//     // Create admin account for the province
//     await supabase.auth.admin.createUser({
//       email: `admin_TK_${province.PROVINCE_ID}@magic-post.com`,
//       password: `admin_TK_${province.PROVINCE_ID}`,
//       email_confirm: true,
//       user_metadata: {
//         province: province,
//         type: "admin_TK",
//       },
//     });

//     // Create an admin account for each district
//     for (const district of selectedDistricts) {
//       await supabase.auth.admin.createUser({
//         email: `admin_GD_${province.PROVINCE_ID}_${district.DISTRICT_ID}@magic-post.com`,
//         password: `admin_GD_${province.PROVINCE_ID}_${district.DISTRICT_ID}`,
//         email_confirm: true,
//         user_metadata: {
//           province: province,
//           district: district,
//           type: "admin_GD",
//         },
//       });
//     }
//   }

//   console.log("All users created successfully");
// } catch (error) {
//   console.error("An error occurred:", error);
// }

// NOTE: delete all users
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

// NOTE: create users
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

// NOTE: update all user password to match email
// const {
//   data: { users },
//   error,
// } = await supabase.auth.admin.listUsers({
//   page: 1,
//   perPage: 1000,
// });

// // leader, tk_admin, gd_admin, tk_staff, gd_staff
// for (let user of users) {
//   if (user.user_metadata.type !== "leader") {
//     const { data, error } = await supabase.auth.admin.updateUserById(
//       user.id,
//       {
//         password: user.email?.split("@")[0],
//       }
//     );

//     if (error) {
//       console.log(error);
//     }
//   }
// }

type Province = {
  PROVINCE_ID: number;
  PROVINCE_CODE: string;
  PROVINCE_NAME: string;
  VALUE: string;
};

type District = {
  DISTRICT_ID: number;
  DISTRICT_VALUE: string;
  DISTRICT_NAME: string;
  PROVINCE_ID: number;
  VALUE: string;
};

type Ward = {
  WARDS_ID: number;
  WARDS_NAME: string;
  DISTRICT_ID: number;
  LOCATION_CODE: string;
};

// const Page = () => {
//   const [supabase, setSupabase] = useState(() => {
//     return createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//       process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string
//     );
//   });

//   // NOTE: fake user data (based on user_metadata)
//   // NOTE: add fake user data to profiles table (based on user_metadata)
//   // NOTE: update location managers => QUERY SQL
//   // NOTE: add type to profiles
//   const handleClick = async () => {

//   };
//   return (
//     <div className="w-screen h-screen flex justify-center items-center">
//       <button onClick={handleClick}>Click me</button>
//     </div>
//   );
// };

const Page = () => {
  return <div></div>;
};

export default Page;
