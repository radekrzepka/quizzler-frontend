"use server";

import { revalidatePath } from "next/cache";

export const revalidateAction = (path: string) => {
   return revalidatePath(path);
};
