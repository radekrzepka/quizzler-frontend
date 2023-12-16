import type { UserInfo } from "@/types/user-info";

export const getCurrentUser = async (
   JWT?: string
): Promise<UserInfo | null> => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      headers: JWT ? { Authorization: JWT } : {},
   });

   if (!res.ok) {
      return null;
   }

   const data = (await res.json()) as UserInfo;

   return data;
};
