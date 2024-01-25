"use server";

import { revalidatePath } from "next/cache";
import { DASHBOARD } from "./urls";

export const revalidateDashboard = () => {
   return revalidatePath(DASHBOARD);
};
