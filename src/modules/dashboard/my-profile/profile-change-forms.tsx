"use client";

import { FC } from "react";
import { UserInfo } from "@/types/user-info";
import ChangeDataForm from "./change-data-form";
import ChangePasswordForm from "./change-password-form";
import DeleteProfile from "./delete-profile";

interface ProfileChangeFormsProps {
   profile: UserInfo;
}

const ProfileChangeForms: FC<ProfileChangeFormsProps> = ({ profile }) => {
   return (
      <div className="flex flex-col items-center gap-4 rounded-xl bg-text text-background">
         <ChangeDataForm profile={profile} />
         <ChangePasswordForm />
         <DeleteProfile />
      </div>
   );
};

export default ProfileChangeForms;
