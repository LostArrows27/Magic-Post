import * as z from "zod";

/*
1. productName
2. weight
3. description
4. height
5. width
6. length
*/

export const parcelFormSchema = z.object({
  productName: z
    .string({
      required_error: "Product name is required",
    })
    .min(1, {
      message: "Product name is required",
    }),
  weight: z
    .string({
      required_error: "Weight is required",
    })
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, {
      message: "Description is required",
    }),
  height: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  width: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
  length: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    })
    .optional(),
});

export type ParcelFormType = z.infer<typeof parcelFormSchema>;
