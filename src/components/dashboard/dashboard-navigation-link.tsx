import { FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

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
            isSelected && "bg-accent text-gray-950 hover:text-gray-700",
            "rounded p-1 text-center transition-all hover:text-gray-400 md:p-2",
         )}
      >
         {label}
      </Link>
   );
};

export default DashboardNavigationLink;
