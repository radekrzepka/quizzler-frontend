import { z } from "zod";

export const signUpFormSchema = z.object({
   email: z.string().email().min(1).max(100),
   password: z.string().min(1).max(100),
   repeatedPassword: z.string().min(1).max(100),
   userName: z.string().min(1).max(100),
   firstName: z.string().min(1).max(100).optional(),
   lastName: z.string().min(1).max(100).optional(),
});

export type SignUpForm = z.infer<typeof signUpFormSchema>;
