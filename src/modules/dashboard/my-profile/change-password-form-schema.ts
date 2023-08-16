import { z } from "zod";

export const changePasswordFormSchema = z
   .object({
      oldPassword: z
         .string()
         .min(8, { message: "Password must have at least 8 characters" })
         .max(100, { message: "Password too long (max 100 characters)" }),
      newPassword: z
         .string()
         .min(8, { message: "Password must have at least 8 characters" })
         .max(100, { message: "Password too long (max 100 characters)" }),
      repeatedNewPassword: z.string(),
   })
   .refine((data) => data.newPassword === data.repeatedNewPassword, {
      message: "Passwords don't match",
      path: ["repeatedPassword"],
   });

export type ChangePasswordForm = z.infer<typeof changePasswordFormSchema>;
