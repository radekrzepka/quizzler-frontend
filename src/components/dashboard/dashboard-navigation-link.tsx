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
            isSelected && "bg-accent hover:text-background",
            "rounded p-2 hover:text-gray-600",
         )}
      >
         {label}
      </Link>
   );
};

export default DashboardNavigationLink;
