import Image from "next/image";
import AddIcon from "./../../assets/icons/add-icon.svg";
import DeleteIcon from "./../../assets/icons/delete-icon.svg";
import classNames from "classnames";
import { FieldValues, Path } from "react-hook-form";
import { Dispatch, SetStateAction, FC } from "react";

interface ImageContainerProps<T> {
   selectedImage: string | null;
   fullRounded?: boolean;
   name: Path<T>;
   setValue: (
      name: Path<T>,
      value: any,
      options?: Partial<{ shouldValidate: boolean; shouldDirty: boolean }>,
   ) => void;
   setSelectedImage: Dispatch<SetStateAction<string | null>>;
}

const ImageContainer = <T extends FieldValues>({
   selectedImage,
   fullRounded = false,
   name,
   setValue,
   setSelectedImage,
}: ImageContainerProps<T>) => {
   return (
      <>
         {selectedImage && (
            <div className="absolute inset-0">
               <Image
                  src={selectedImage}
                  alt="Selected lesson image"
                  fill={true}
                  className={classNames(
                     "h-full w-full object-cover",
                     fullRounded ? "rounded-xl" : "rounded-t-xl",
                  )}
               />
               <Image
                  className="absolute right-0 top-0"
                  src={DeleteIcon}
                  alt="Delete image icon"
                  onClick={(event) => {
                     event.stopPropagation();
                     setValue(name, null);
                     setSelectedImage(null);
                  }}
               />
            </div>
         )}
         {!selectedImage && (
            <Image
               className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
               src={AddIcon}
               alt="Add image icon"
            />
         )}
      </>
   );
};

export default ImageContainer;
