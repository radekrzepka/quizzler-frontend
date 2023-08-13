import { FC } from "react";
import { cookies } from "next/headers";
import { UserInfo } from "@/types/user-info";

interface MyProfileProps {}

const getProfileData = async () => {
   const cookieStore = cookies();
   const JWT = cookieStore.get("JWT");

   const res = await fetch(`${process.env.URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${JWT?.value}` },
      cache: "no-store",
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   return res.json();
};

const MyProfile: FC<MyProfileProps> = async ({}) => {
   const profileData: UserInfo = await getProfileData();

   return <div>My name is {profileData.firstName}</div>;
};

export default MyProfile;
