import type { UserInfo } from "@/types/user-info";
import { PROFILE } from "@/utils/urls";
import Link from "next/link";
import Avatar from "./avatar";

interface UserLinkProps {
   user: UserInfo;
   reverseOrder?: boolean;
   disableUnderline?: boolean;
}

const UserLink = ({
   user,
   reverseOrder,
   disableUnderline = false,
}: UserLinkProps) => {
   return (
      <Link
         href={PROFILE(user.username)}
         className={`flex items-center justify-end gap-1 ${
            reverseOrder ? "flex-row-reverse" : "flex-row"
         }`}
      >
         <Avatar profile={user} size="small" />
         <p className={`${disableUnderline ? "no-underline" : "underline"}`}>
            {user.username}
         </p>
      </Link>
   );
};

export default UserLink;
