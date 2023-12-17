import Avatar from "@/components/ui/avatar";
import Tag from "@/components/ui/tag";
import type { UserInfo } from "@/types/user-info";
import { PROFILE } from "@/utils/urls";
import { formatDistanceToNow } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Link from "next/link";

interface UserSerachCardProps {
   user: UserInfo;
}

const UserSerachCard = ({ user }: UserSerachCardProps) => {
   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const lastSeenDate = new Date(user.lastSeen.toString() + "Z");
   const localDate = utcToZonedTime(new Date(lastSeenDate), timeZone);

   return (
      <Link
         href={PROFILE(user.username)}
         className="flex flex-col justify-between rounded-xl bg-text p-2 text-background transition duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-lg sm:flex-row"
      >
         <div>
            <div className="mb-2 flex items-center gap-2">
               <Avatar profile={user} />
               <div>
                  <h2 className="text-2xl leading-none">{user.username}</h2>
                  {user.firstName && user.lastName && (
                     <p className="leading-none">
                        {`${user.firstName} ${user.lastName}`}
                     </p>
                  )}
                  <p className="text-sm leading-none text-gray-600">
                     Last seen: {formatDistanceToNow(localDate)} ago
                  </p>

                  <Tag className="mt-1 font-bold">
                     {user.lessonCount} created lesson
                     {user.lessonCount !== 1 && "s"}
                  </Tag>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default UserSerachCard;
