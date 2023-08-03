import { z } from "zod";

export const signUpFormSchema = z
   .object({
      email: z
         .string()
         .email()
         .min(1, { message: "Email is required" })
         .max(100, { message: "Email too long (max 100 characters)" }),
      password: z
         .string()
         .min(8, { message: "Password must have at least 8 characters" })
         .max(100, { message: "Password too long (max 100 characters)" }),
      repeatedPassword: z.string(),
      username: z
         .string()
         .min(1, { message: "Username is required" })
         .max(32, { message: "Username too long (max 32 characters)" }),
      firstName: z
         .string()
         .max(20, { message: "Firstname too long (max 20 characters)" })
         .optional(),
      lastName: z
         .string()
         .max(20, { message: "Lastname too long (max 20 characters)" })
         .optional(),
   })
   .refine((data) => data.password === data.repeatedPassword, {
      message: "Passwords don't match",
      path: ["repeatedPassword"],
   });

export type SignUpForm = z.infer<typeof signUpFormSchema>;
