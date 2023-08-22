import { z } from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
   "image/jpeg",
   "image/jpg",
   "image/png",
   "image/webp",
];

export const newLessonFormSchema = z.object({
   title: z
      .string()
      .min(1, { message: "Title is required" })
      .max(40, { message: "Title too long (max 40 characters)" }),
   description: z
      .string()
      .max(150, { message: "Description too long (max 150 characters)" })
      .optional(),
   lessonType: z.enum(["public", "private"]),
   image: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
         (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
         "Only .jpg, .jpeg, .png and .webp formats are supported.",
      )
      .optional(),
});

export type NewLessonForm = z.infer<typeof newLessonFormSchema>;
