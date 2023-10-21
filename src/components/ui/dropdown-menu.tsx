import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import Image from "next/image";
import { FC, Fragment } from "react";
import DeleteIcon from "./../../assets/icons/black-delete-icon.svg";
import PenIcon from "./../../assets/icons/pen-icon.svg";

interface DropdownMenuProps {
   options: Array<{
      label: string;
      onClickFunction: () => void;
   }>;
   className?: string;
}

const icons = {
   edit: PenIcon,
   delete: DeleteIcon,
};

const DropdownMenu: FC<DropdownMenuProps> = ({ options, className }) => {
   return (
      <div className={classNames("text-right", className)}>
         <Menu as="div" className="relative inline-block text-left">
            <div>
               <Menu.Button className="inline-flex w-full justify-center rounded-md bg-accent px-4 py-1 text-sm font-medium text-background hover:bg-opacity-95">
                  Options
                  <ChevronDownIcon
                     className="-mr-1 ml-2 h-5 w-5 text-background"
                     aria-hidden="true"
                  />
               </Menu.Button>
            </div>
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
      </div>
   );
};

export default DropdownMenu;
