import { z } from "zod";
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const isAtLeast18YearsOld = (date: Date): boolean => {
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  return date <= eighteenYearsAgo;
};
export const newLocationSchema = z.object({
  full_name: z.string({
    required_error: "Please enter full name",
  }),
  gender: z.string({
    required_error: "Please select a gender.",
  }),
  home_town: z.string({
    required_error: "Please enter your home town address.",
  }),
  phone_number: z
    .string({
      required_error: "Please enter phone number.",
    })
    .min(10, "Please enter a valid phone number.")
    .max(15, "Please enter a valid phone number.")
    .regex(phoneRegex, "Please enter a valid phone number."),
  province: z.string({
    required_error: "Please select a province.",
  }),
  province_id: z.string({
    required_error: "Please select a province.",
  }),
  district: z.string({
    required_error: "Please select a district.",
  }),
  district_id: z.string({
    required_error: "Please select a district.",
  }),
  dob: z
    .date({
      required_error: "Please enter your date of birth.",
    })
    .refine(isAtLeast18YearsOld, {
      message: "Must be at least 18 years old",
    }),
});
export const NewStaffSchema = z.object({
  full_name: z.string({
    required_error: "Please enter full name",
  }),
  gender: z.string({
    required_error: "Please select a gender.",
  }),
  home_town: z.string({
    required_error: "Please enter your home town address.",
  }),
  phone_number: z
    .string({
      required_error: "Please enter phone number.",
    })
    .min(10, "Please enter a valid phone number.")
    .max(15, "Please enter a valid phone number.")
    .regex(phoneRegex, "Please enter a valid phone number."),
  dob: z
    .date({
      required_error: "Please enter your date of birth.",
    })
    .refine(isAtLeast18YearsOld, {
      message: "Must be at least 18 years old",
    }),
});
