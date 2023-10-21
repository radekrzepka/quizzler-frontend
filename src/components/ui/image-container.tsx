import classNames from "classnames";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, Path } from "react-hook-form";
import AddIcon from "./../../assets/icons/add-icon.svg";
import DeleteIcon from "./../../assets/icons/delete-icon.svg";

interface ImageContainerProps<T> {
   selectedImage: string | null | undefined;
   fullRounded?: boolean;
   name: Path<T>;
   setValue: (
      name: Path<T>,
      value: any,
      options?: Partial<{ shouldValidate: boolean; shouldDirty: boolean }>,
   ) => void;
   setSelectedImage: Dispatch<SetStateAction<string | null | undefined>>;
}

const ImageContainer = <T extends FieldValues>({
   selectedImage,
   fullRounded = false,
   name,
   setValue,
   setSelectedImage,
}: ImageContainerProps<T>) => {
   const isImageFromServer = selectedImage?.includes("/images");

   return (
      <>
         {selectedImage && (
            <div className="absolute inset-0">
               <Image
                  src={
                     isImageFromServer
                        ? `http://104.250.180.67${selectedImage}`
                        : selectedImage
                  }
                  alt={`Selected ${name}`}
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
