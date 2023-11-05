import { Menu, Transition } from "@headlessui/react";
import {
   ChevronDownIcon,
   EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { FC, Fragment } from "react";
import classNames from "classnames";

interface DropdownMenuProps {
   options: Array<{
      label: string;
      onClickFunction: () => void;
   }>;
   smallIcon?: boolean;
   iconColor?: string;
   className?: string;
}

const icons = {
   edit: "icons/pen-icon.svg",
   delete: "/icons/black-delete-icon.svg",
};

const DropdownMenu: FC<DropdownMenuProps> = ({
   options,
   smallIcon = false,
   iconColor = "white",
   className,
}) => {
   return (
      <>
         <Menu
            as="div"
            className={classNames("relative inline-block text-left", className)}
         >
            <>
               {smallIcon ? (
                  <Menu.Button className="grid place-items-center">
                     <EllipsisVerticalIcon
                        className={`h-6 w-6 text-${iconColor}`}
                        aria-hidden="true"
                     />
                  </Menu.Button>
               ) : (
                  <Menu.Button className="inline-flex w-full justify-center rounded-md bg-accent px-4 py-1 text-sm font-medium text-background hover:bg-opacity-95">
                     Options
                     <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5 text-background"
                        aria-hidden="true"
                     />
                  </Menu.Button>
               )}
            </>
            <Transition
               as={Fragment}
               enter="transition ease-out duration-100"
               enterFrom="transform opacity-0 scale-95"
               enterTo="transform opacity-100 scale-100"
               leave="transition ease-in duration-75"
               leaveFrom="transform opacity-100 scale-100"
               leaveTo="transform opacity-0 scale-95"
            >
               <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y rounded-md bg-white shadow-lg">
                  {options.map((option) => (
                     <div key={option.label} className=" px-1 py-1">
                        <Menu.Item>
                           {({ active }) => (
                              <button
                                 onClick={option.onClickFunction}
                                 className={`${
                                    active
                                       ? "bg-primary text-black"
                                       : "text-black"
                                 } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                 {icons[
                                    option.label.toLocaleLowerCase() as keyof typeof icons
                                 ] && (
                                    <Image
                                       className="mr-1"
                                       alt={`Icon of ${option.label}`}
                                       src={
                                          icons[
                                             option.label.toLocaleLowerCase() as keyof typeof icons
                                          ]
                                       }
                                       width={12}
                                       height={12}
                                    />
                                 )}

                                 {option.label}
                              </button>
                           )}
                        </Menu.Item>
                     </div>
                  ))}
               </Menu.Items>
            </Transition>
         </Menu>
      </>
   );
};

export default DropdownMenu;
