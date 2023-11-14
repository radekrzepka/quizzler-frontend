import type { UserInfo } from "@/types/user-info";

export const getUser = async (JWT?: string): Promise<UserInfo> => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      headers: {
         Authorization: JWT as string,
      },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   const data = (await res.json()) as UserInfo;

   return data;
};
