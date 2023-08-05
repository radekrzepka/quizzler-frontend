import { FC, ReactNode } from "react";
import CloseIcon from "./../../assets/close-icon.svg";
import Image from "next/image";

interface ModalProps {
   children: ReactNode;
   closeModalFunction: () => void;
}

const Modal: FC<ModalProps> = ({ children, closeModalFunction }) => {
   return (
      <div className="absolute left-0 top-0 grid h-screen w-screen place-items-center bg-background text-black opacity-[0.98]">
         <div className="relative z-20 grid w-1/2 place-items-center rounded-xl bg-white p-10 opacity-100">
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
      </div>
   );
};

export default Modal;
