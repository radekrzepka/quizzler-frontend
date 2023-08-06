import { FC, ReactNode } from "react";
import CloseIcon from "./../../assets/close-icon.svg";
import Image from "next/image";
import { createPortal } from "react-dom";

interface ModalProps {
   children: ReactNode;
   closeModalFunction: () => void;
}

const Modal: FC<ModalProps> = ({ children, closeModalFunction }) => {
   return createPortal(
      <div className="fixed left-0 top-0 grid h-screen w-screen place-items-center bg-background bg-opacity-50 text-background">
         <div className="relative z-20 grid w-1/2 place-items-center rounded-xl bg-white p-10">
            <button
               onClick={() => closeModalFunction()}
               className="absolute right-3 top-3"
            >
               <Image
                  width={15}
                  height={15}
                  src={CloseIcon}
                  alt="Icon of closing modal"
               />
            </button>
            {children}
         </div>
      </div>,
      document.body,
   );
};

export default Modal;
