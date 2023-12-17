import type { UserInfo } from "@/types/user-info";
import getClientJWT from "../get-client-jwt";

export const getClientCurrentUser = async (): Promise<UserInfo | null> => {
   const JWT = getClientJWT();

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      headers: JWT ? { Authorization: JWT } : {},
   });

   if (!res.ok) {
      return null;
   }

   const data = (await res.json()) as UserInfo;

   return data;
};
