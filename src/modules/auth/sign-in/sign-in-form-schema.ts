import { z } from "zod";

export const signInFormSchema = z.object({
   email: z
      .string()
      .email()
      .min(1, { message: "Email is required" })
      .max(100, { message: "Email too long (max 100 characters)" }),
   password: z
      .string()
      .min(1, { message: "Password is required" })
      .max(100, { message: "Password too long (max 100 characters)" }),
});

export type SignInForm = z.infer<typeof signInFormSchema>;
