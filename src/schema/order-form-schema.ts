import * as z from "zod";

/* 
1. full_name
2. phone_number
3. address
4. province_id
5. district_id
6. ward_id
7. subward_id
*/

export const orderFormSchema = z.object({
  full_name: z
    .string({
      required_error: "Fullname is required",
    })
    .min(1, {
      message: "Fullname  is required",
    }),
  phone_number: z
    .string({
      required_error: "Phone number is required",
    })
    .length(10, {
      message: "Phone number is required",
    }),
  email: z.string().email().optional(),
  address: z
    .string({
      required_error: "Address is required",
    })
    .min(1, {
      message: "Address is required",
    }),
  province_id: z.string({
    required_error: "Please select a province",
  }),
  district_id: z.string({
    required_error: "Please select a district",
  }),
  ward_id: z.string({
    required_error: "Please select a subward",
  }),
  subward_id: z
    .string({
      required_error: "Please select a subward",
    })
    .optional(),
});

export type OrderFormType = z.infer<typeof orderFormSchema>;
