import { Dialog as HeadlessUiDialog, Transition } from "@headlessui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { Fragment } from "react";

interface DialogProps {
   title?: string;
   children: ReactNode;
   isOpen?: boolean;
   setIsOpen?: Dispatch<SetStateAction<boolean>>;
   backgroundColor?: string;
}

const Dialog = ({
   title,
   children,
   isOpen = true,
   setIsOpen,
   backgroundColor,
}: DialogProps) => {
   return (
      <Transition appear show={isOpen} as={Fragment}>
         <HeadlessUiDialog
            as="div"
            className="relative z-10"
            onClose={() => {
               setIsOpen && setIsOpen(false);
            }}
         >
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
               <div className="flex min-h-full items-center justify-center p-4 text-center ">
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0 scale-95"
                     enterTo="opacity-100 scale-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100 scale-100"
                     leaveTo="opacity-0 scale-95"
                  >
                     <HeadlessUiDialog.Panel
                        className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all "
                        style={{ backgroundColor: backgroundColor || "white" }}
                     >
                        <HeadlessUiDialog.Title
                           as="h3"
                           className="text-center text-lg font-medium leading-6 text-gray-900"
                        >
                           {title}
                        </HeadlessUiDialog.Title>
                        <div className="mt-2">
                           <div className="text-sm text-gray-500">
                              {children}
                           </div>
                        </div>
                     </HeadlessUiDialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </HeadlessUiDialog>
      </Transition>
   );
};

export default Dialog;
