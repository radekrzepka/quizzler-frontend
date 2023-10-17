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
      .optional(),
   lessonType: z.object({
      label: z.enum(["Public", "Private"]),
      value: z.enum(["public", "private"]),
   }),
   image: imageSchema,
});

export type EditLessonForm = z.infer<typeof editLessonFormSchema>;
