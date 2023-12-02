import type { UserInfo } from "@/types/user-info";

export const getUser = async (username: string): Promise<UserInfo> => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${username}/profile`
   );

   if (!res.ok) {
      throw new Error("User not log in");
   }

   const data = (await res.json()) as UserInfo;

   return data;
};
