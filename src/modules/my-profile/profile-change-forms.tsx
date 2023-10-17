"use client";

import { UserInfo } from "@/types/user-info";
import { FC } from "react";
import ChangeDataForm from "./change-data-form";
import ChangePasswordForm from "./change-password-form";
import DeleteProfileForm from "./delete-profile-form";

interface ProfileChangeFormsProps {
   profile: UserInfo;
}

const ProfileChangeForms: FC<ProfileChangeFormsProps> = ({ profile }) => {
   return (
      <div className="flex flex-col items-center gap-4 rounded-xl bg-text text-background">
         <ChangeDataForm profile={profile} />
         <ChangePasswordForm />
         <DeleteProfileForm />
      </div>
   );
};

export default ProfileChangeForms;
