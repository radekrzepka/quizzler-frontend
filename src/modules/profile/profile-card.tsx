import Avatar from "@/components/ui/avatar";
import type { UserInfo } from "@/types/user-info";
import classNames from "classnames";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

interface userCardProps {
   user: UserInfo;
}

const userCard = ({ user }: userCardProps) => {
   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const lastSeenDate = new Date(user.lastSeen.toString() + "Z");
   const localDate = utcToZonedTime(new Date(lastSeenDate), timeZone);

   return (
      <div className="flex h-min flex-col items-center rounded-xl bg-text text-background">
         {user.firstName && (
            <h2 className="mt-2 text-3xl font-bold">
               {user.firstName} {user?.lastName}
            </h2>
         )}
         <Avatar
            className="relative inline-block"
            size="large"
            profile={user}
         />

         <p
            className={classNames(
               user.firstName ? "text-gray-600" : "mt-2 text-3xl font-bold"
            )}
         >
            {user.firstName && "@"}
            {user.username}
         </p>
         <p>
            Member since:{" "}
            {format(parseISO(user.dateRegistered), "dd MMMM yyyy")}
         </p>
         <p>Last seen: {formatDistanceToNow(localDate)} ago</p>
      </div>
   );
};

export default userCard;
