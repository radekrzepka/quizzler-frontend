import imageSchema from "@/utils/image-schema";
import { z } from "zod";

export const newFlashcardFormSchema = z
   .object({
      question: z
         .string()
         .max(200, { message: "Question too long (max 200 characters)" })
         .nullable(),
      answer: z
         .string()
         .max(200, { message: "Answer too long (max 200 characters)" })
         .nullable(),
      questionImage: imageSchema,
      answerImage: imageSchema,
   })
   .refine((data) => Boolean(data.question || data.questionImage), {
      path: ["question"],
      message: "Either question or image must be provided",
   })
   .refine((data) => Boolean(data.answer || data.answerImage), {
      path: ["answer"],
      message: "Either answer or image must be provided",
   });

export type NewFlashcardForm = z.infer<typeof newFlashcardFormSchema>;
