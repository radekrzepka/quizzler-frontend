import { FC } from "react";
import { cookies } from "next/headers";
import { UserInfo } from "@/types/user-info";
import ProfileChangeForm from "@/modules/dashboard/my-profile/profile-change.form";
import dynamic from "next/dynamic";

const ProfileCard = dynamic(
   () => import("@/modules/dashboard/my-profile/profile-card"),
   { ssr: false },
);

const getProfileData = async () => {
   const cookieStore = cookies();
   const JWT = cookieStore.get("JWT");

   const res = await fetch(`${process.env.URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${JWT?.value}` },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   return res.json();
};

const MyProfile: FC = async () => {
   const profileData: UserInfo = await getProfileData();

   return (
      <div className="grid gap-10 lg:grid-cols-2">
         <ProfileCard profile={profileData} />
         <ProfileChangeForm />
      </div>
   );
};

export default MyProfile;
