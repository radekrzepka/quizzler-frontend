import type { UserInfo } from "@/types/user-info";
import getServerJWT from "../get-server-jwt";

export const getServerCurrentUser = async (): Promise<UserInfo | null> => {
   const JWT = getServerJWT();

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      headers: JWT ? { Authorization: JWT } : {},
   });

   if (!res.ok) {
      return null;
   }

   const data = (await res.json()) as UserInfo;

   return data;
};
