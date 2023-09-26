import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { MutableRefObject, Dispatch, SetStateAction } from "react";
import classNames from "classnames";

interface ImageInputProps<T extends FieldValues> {
   register: UseFormRegister<T>;
   name: Path<T>;
   setValue: (
      name: Path<T>,
      value: any,
      options?: Partial<{ shouldValidate: boolean; shouldDirty: boolean }>,
   ) => void;
   setSelectedImage: Dispatch<SetStateAction<string | null | undefined>>;
   imageInputRef: MutableRefObject<HTMLInputElement | null>;
   showInput?: boolean;
}

const ImageInput = <T extends FieldValues>({
   register,
   name,
   setValue,
   setSelectedImage,
   imageInputRef,
   showInput = false,
}: ImageInputProps<T>) => {
   const { ref, ...rest } = register(name);

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const imageURL = URL.createObjectURL(e.target.files[0]);
         setValue(name, e.target.files[0]);
         setSelectedImage(imageURL);
      }
   };

   return (
      <input
         type="file"
         className={classNames(showInput ? "w-full" : "hidden")}
         ref={(e) => {
            ref(e);
            imageInputRef.current = e;
         }}
         accept="image/png, image/jpeg, image/webp, image/jpg"
         {...rest}
         onChange={handleImageChange}
      />
   );
};

export default ImageInput;
