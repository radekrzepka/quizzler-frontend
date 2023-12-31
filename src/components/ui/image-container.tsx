import classNames from "classnames";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import type {
   FieldValues,
   Path,
   UseFormSetValue,
   PathValue,
} from "react-hook-form";

interface ImageContainerProps<T extends FieldValues> {
   selectedImage: string | null | undefined;
   fullRounded?: boolean;
   name: Path<T>;
   setValue: UseFormSetValue<T>;
   onDelete?: () => void;
   setSelectedImage: Dispatch<SetStateAction<string | null | undefined>>;
}

const ImageContainer = <T extends FieldValues>({
   selectedImage,
   fullRounded = false,
   name,
   setValue,
   setSelectedImage,
   onDelete,
}: ImageContainerProps<T>) => {
   const isImageFromServer = selectedImage
      ?.substring(selectedImage?.lastIndexOf("/"))
      .includes(".");

   return (
      <>
         {selectedImage && (
            <div
               className={classNames(
                  "absolute inset-0 bg-gray-700",
                  fullRounded ? "rounded-xl" : "rounded-t-xl"
               )}
            >
               <div
                  className={classNames(
                     "relative h-full w-full",
                     fullRounded ? "rounded-xl" : "rounded-t-xl"
                  )}
               >
                  <Image
                     src={
                        isImageFromServer
                           ? `${process.env.NEXT_PUBLIC_IMG_URL}/${selectedImage}`
                           : selectedImage
                     }
                     alt={`Selected ${name}`}
                     fill={true}
                     className={classNames(
                        "object-contain",
                        fullRounded ? "rounded-xl" : "rounded-t-xl"
                     )}
                  />
                  <Image
                     className="absolute right-0 top-0"
                     src="/icons/delete-icon.svg"
                     width={32}
                     height={32}
                     alt="Delete image icon"
                     onClick={event => {
                        event.stopPropagation();
                        setValue(name, "" as unknown as PathValue<T, Path<T>>);
                        setSelectedImage(null);
                        onDelete?.();
                     }}
                  />
               </div>
            </div>
         )}
         {!selectedImage && (
            <Image
               height={32}
               width={32}
               className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
               src="/icons/add-icon.svg"
               alt="Add image icon"
            />
         )}
      </>
   );
};

export default ImageContainer;
