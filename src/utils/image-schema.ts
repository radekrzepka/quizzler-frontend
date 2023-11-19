import z from "zod";

const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_IMAGE_TYPES = [
   "image/jpeg",
   "image/jpg",
   "image/png",
   "image/webp",
];

const imageSchema = z
   .union([z.literal(null), z.any()])
   .optional()
   .refine(
      (file: File | string) => {
         if (!file || typeof file === "string") return true;
         return (
            file.size <= MAX_FILE_SIZE &&
            ACCEPTED_IMAGE_TYPES.includes(file.type)
         );
      },
      {
         message: `Image must be one of the following types: ${ACCEPTED_IMAGE_TYPES.map(
            type => `.${type.split("/")[1]}`
         ).join(", ")} and not exceed ${MAX_FILE_SIZE / 1000000}MB`,
      }
   );

export default imageSchema;
