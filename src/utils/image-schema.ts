import z from "zod";

const MAX_FILE_SIZE = 500000;
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
      (file) => {
         if (!file) return true;
         return (
            file.size <= MAX_FILE_SIZE &&
            ACCEPTED_IMAGE_TYPES.includes(file.type)
         );
      },
      {
         message: `Image must be one of the following types: ${ACCEPTED_IMAGE_TYPES.join(
            ", ",
         )} and not exceed ${MAX_FILE_SIZE / 100000}MB`,
      },
   );

export default imageSchema;
