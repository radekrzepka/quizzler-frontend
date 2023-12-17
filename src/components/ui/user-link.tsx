import type { UserInfo } from "@/types/user-info";
import { PROFILE } from "@/utils/urls";
import Link from "next/link";
import Avatar from "./avatar";

interface UserLinkProps {
   user: UserInfo;
}

const UserLink = ({ user }: UserLinkProps) => {
   return (
      <Link
         href={PROFILE(user.username)}
         className="flex items-center justify-end gap-1"
      >
         <Avatar profile={user} size="small" />
         <p className="underline">{user.username}</p>
      </Link>
   );
};

export default UserLink;
