import { z } from "zod";

export const signInFormSchema = z.object({
   usernameOrEmail: z
      .string()
      .min(1, { message: "Email/username is required" })
      .max(100, { message: "Email/username too long (max 100 characters)" }),
   password: z
      .string()
      .min(1, { message: "Password is required" })
      .max(100, { message: "Password too long (max 100 characters)" }),
});

export type SignInForm = z.infer<typeof signInFormSchema>;
