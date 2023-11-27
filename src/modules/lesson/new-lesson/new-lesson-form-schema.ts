import imageSchema from "@/utils/image-schema";
import { z } from "zod";

export const newLessonFormSchema = z.object({
   title: z
      .string()
      .min(1, { message: "Title is required" })
      .max(40, { message: "Title too long (max 40 characters)" }),
   description: z
      .string()
      .max(150, { message: "Description too long (max 150 characters)" })
      .optional(),
   lessonType: z.object({
      label: z.enum(["Public", "Private"]),
      value: z.enum(["public", "private"]),
   }),
   tags: z
      .array(
         z.object({
            label: z
               .string()
               .max(50, { message: "Tag too long (max 50 characters)" }),
            value: z
               .string()
               .max(50, { message: "Tag too long (max 50 characters)" }),
         }),
      )
      .optional(),
   image: imageSchema,
});

export type NewLessonForm = z.infer<typeof newLessonFormSchema>;
