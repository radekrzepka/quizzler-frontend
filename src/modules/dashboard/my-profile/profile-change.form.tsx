"use client";

import { FC } from "react";
import { UserInfo } from "@/types/user-info";
import ChangeDataForm from "./change-data-form";
import ChangePasswordForm from "./change-password-form";
import Button from "@/components/ui/button";

interface ProfileChangeFormProps {
   profile: UserInfo;
}

const ProfileChangeForm: FC<ProfileChangeFormProps> = ({ profile }) => {
   return (
      <div className="flex flex-col items-center gap-4 rounded-xl bg-text text-background">
         <ChangeDataForm profile={profile} />
         <ChangePasswordForm profile={profile} />
         <div className="flex w-3/4 flex-col items-center">
            <h2 className="mt-2 text-3xl font-bold">Delete your account</h2>
            <p className="my-3 text-center">
               If you click on this button, you will delete your account in our
               store. Make sure you definitely want to do this - your account
               cannot be restored.
            </p>
            <Button
               variant="primary"
               type="button"
               label="Delete your account"
               className="mb-2"
            />
         </div>
      </div>
   );
};

export default ProfileChangeForm;
