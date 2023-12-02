import type { UserInfo } from "@/types/user-info";

export const getCurrentUser = async (JWT?: string): Promise<UserInfo> => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      headers: JWT ? { Authorization: JWT } : {},
   });

   if (!res.ok) {
      throw new Error("User not log in");
   }

   const data = (await res.json()) as UserInfo;

   return data;
};
