import { z } from "zod";
const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

  const isAtLeast18YearsOld = (date: string): boolean => {
    const thatDate = new Date(date);
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return thatDate <= eighteenYearsAgo;
  };
export const NewStaffSchema = z
  .object({
    full_name: z.string({
      required_error: 'Please enter full name'
    }),
    gender: z.string({
        required_error: 'Please select a gender.'
      }),
   home_town: z.string({
    required_error: "Please enter your home town address."
  }),
   phone_number: z.string({
    required_error: "Please enter phone number."
  }).min(10, 'Please enter a valid phone number.').max(15, 'Please enter a valid phone number.').regex(phoneRegex, 'Please enter a valid phone number.'),
   dob:  z.string({
    required_error: "Please enter your date of birth.",
  }).refine(isAtLeast18YearsOld, {
    message: "Must be at least 18 years old",
  }),
  })
