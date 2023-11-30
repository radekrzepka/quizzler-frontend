import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardNavigationLinkProps {
   path: string;
   label: string;
}

const DashboardNavigationLink = ({
   path,
   label,
}: DashboardNavigationLinkProps) => {
   const currentPath = usePathname();
   const isSelected = currentPath === path;

   return (
      <li className="grid min-w-max place-items-center">
         <Link
            href={path}
            className={classNames(
               "cursor-pointer p-1 text-center text-xl ",
               isSelected ? "border-b-2 border-text" : "bg-background text-text"
            )}
         >
            {label}
         </Link>
      </li>
   );
};

export default DashboardNavigationLink;
