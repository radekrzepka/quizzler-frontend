import imageSchema from "@/utils/image-schema";
import { z } from "zod";

export const editLessonFormSchema = z.object({
   title: z
      .string()
      .min(1, { message: "Title is required" })
      .max(40, { message: "Title too long (max 40 characters)" }),
   description: z
      .string()
      .max(150, { message: "Description too long (max 150 characters)" })
      .optional()
      .nullable(),
   lessonType: z.object({
      label: z.enum(["Public", "Private"]),
      value: z.enum(["public", "private"]),
   }),
   tags: z
      .array(
         z.object({
            label: z.string(),
            value: z.string(),
         }),
      )
      .optional(),
   image: imageSchema,
});

export type EditLessonForm = z.infer<typeof editLessonFormSchema>;
