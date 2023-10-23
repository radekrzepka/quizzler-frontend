import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface DashboardNavigationLinkProps {
   path: string;
   label: string;
}

const DashboardNavigationLink: FC<DashboardNavigationLinkProps> = ({
   path,
   label,
}) => {
   const currentPath = usePathname();
   const isSelected = currentPath === path;

   return (
      <li className="grid w-full place-items-center lg:w-auto">
         <Link
            href={path}
            className={classNames(
               "w-full cursor-pointer rounded p-1 text-center text-xl md:px-8",
               isSelected
                  ? "bg-accent text-background"
                  : "bg-background text-text",
            )}
         >
            {label}
         </Link>
      </li>
   );
};

export default DashboardNavigationLink;
