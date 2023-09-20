import { FC } from "react";
import { cookies } from "next/headers";
import { UserInfo } from "@/types/user-info";
import ProfileCard from "@/modules/dashboard/my-profile/profile-card";
import ProfileChangeForms from "@/modules/dashboard/my-profile/profile-change-forms";

const getProfileData = async () => {
   const cookieStore = cookies();
   const JWT = cookieStore.get("JWT");

   const res = await fetch(`${process.env.URL}/api/user/profile`, {
      headers: { Authorization: JWT?.value as string },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   return res.json();
};

const MyProfile: FC = async () => {
   const { data: profileData }: { data: UserInfo; status: number } =
      await getProfileData();

   return (
      <div className="ml-0 grid gap-10 lg:grid-cols-[3fr_2fr]">
         <ProfileCard profile={profileData} />
         <ProfileChangeForms profile={profileData} />
      </div>
   );
};

export default MyProfile;
