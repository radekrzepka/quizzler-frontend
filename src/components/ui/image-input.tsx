import classNames from "classnames";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type {
   FieldValues,
   Path,
   UseFormRegister,
   UseFormSetValue,
   PathValue,
} from "react-hook-form";

interface ImageInputProps<T extends FieldValues> {
   register: UseFormRegister<T>;
   name: Path<T>;
   setValue: UseFormSetValue<T>;
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
         setValue(name, e.target.files[0] as unknown as PathValue<T, Path<T>>);
         setSelectedImage(imageURL);
      }
   };

   return (
      <input
         type="file"
         className={classNames(showInput ? "w-full" : "hidden")}
         ref={e => {
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
