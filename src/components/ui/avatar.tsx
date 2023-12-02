import type { UserInfo } from "@/types/user-info";
import { generateAbbreviation } from "@/utils/generate-abbreviation";
import classNames from "classnames";
import Image from "next/image";

const sizes = {
   small: 32,
   medium: 44,
   large: 64,
};

interface AvatarProps {
   as?: React.ElementType;
   profile: UserInfo;
   editable?: boolean;
   size?: keyof typeof sizes;
   className?: string;
   onClick?: () => void;
}

const Avatar = ({
   as: As = "div",
   profile,
   editable = false,
   size = "medium",
   className,
   onClick,
}: AvatarProps) => {
   return (
      <As className={className} onClick={onClick}>
         {profile.avatar === null ? (
            <div
               className={classNames(
                  "grid place-items-center rounded-full bg-background font-bold text-primary",
                  size === "small" && "h-8 w-8 text-xl",
                  size === "medium" && "h-11 w-11 text-3xl",
                  size === "large" && "h-16 w-16 text-3xl"
               )}
            >
               {generateAbbreviation(profile)}
            </div>
         ) : (
            <Image
               width={sizes[size]}
               height={sizes[size]}
               src={`/images/avatars/avatar_${profile.avatar}.png`}
               alt={`Avatar of ${profile.username}`}
               className="my-2"
            />
         )}
         {editable && (
            <Image
               width={15}
               height={15}
               className="absolute right-[-1px] top-[2px] z-10"
               alt="Change avatar pen icon"
               src="/icons/pen-icon.svg"
            />
         )}
      </As>
   );
};

export default Avatar;
