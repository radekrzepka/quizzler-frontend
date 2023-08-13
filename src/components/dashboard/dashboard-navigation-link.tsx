import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
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
   const router = useRouter();
   const isSelected = currentPath === path;

   return (
      <button
         onClick={() => router.push(path)}
         className={classNames(
            isSelected && "bg-accent text-gray-950 hover:text-gray-700",
            "rounded p-1 text-center transition-all hover:text-gray-400 md:p-2",
         )}
      >
         {label}
      </button>
   );
};

export default DashboardNavigationLink;
