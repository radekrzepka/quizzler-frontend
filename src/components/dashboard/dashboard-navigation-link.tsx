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
      <Link
         href={path}
         className={classNames(
            isSelected && "text-gray-400",
            "rounded p-1 text-center transition-all hover:text-gray-400 md:p-2",
         )}
      >
         {label}
      </Link>
   );
};

export default DashboardNavigationLink;
