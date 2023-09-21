import { z } from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
   "image/jpeg",
   "image/jpg",
   "image/png",
   "image/webp",
];

export const newFlashcardFormSchema = z.object({
   question: z
      .string()
      .min(1, { message: "Question is required" })
      .max(200, { message: "Question too long (max 200 characters)" }),
   answer: z
      .string()
      .min(1, { message: "Answer is required" })
      .max(200, { message: "Answer too long (max 200 characters)" }),

   questionImage: z
      .any()
      // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      // .refine(
      //    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      //    "Only .jpg, .jpeg, .png and .webp formats are supported.",
      // )
      .optional()
      .nullable(),

   answerImage: z
      .any()
      // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      // .refine(
      //    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      //    "Only .jpg, .jpeg, .png and .webp formats are supported.",
      // )
      .optional()
      .nullable(),
});

export type NewFlashcardForm = z.infer<typeof newFlashcardFormSchema>;
