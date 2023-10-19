import { FC, useState } from "react";
import Button from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import LabelInput from "@/components/ui/label-input";
import Dialog from "@/components/ui/dialog";

const DeleteProfileForm: FC = ({}) => {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [buttonLoading, setButtonLoading] = useState(false);
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm();
   const router = useRouter();

   const { password } = getValues();

   const { mutate: deleteMutation } = useMutation({
      mutationFn: async () => {
         const JWT = getCookie("JWT") as string;

         const res = await fetch(`/api/user/delete`, {
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: JWT,
            },
            method: "DELETE",
            body: JSON.stringify({
               password,
            }),
         });

         return res.json();
      },

      onSettled: (res) => {
         if (res?.status === 200) {
            deleteCookie("JWT");
            toast.success("Account has been deleted");
            router.push("/");
         } else {
            setButtonLoading(false);
            toast.error("Please provide correct password");
         }
      },
   });

   const onSubmit = () => {
      setButtonLoading(true);
      deleteMutation();
   };

   return (
      <div className="flex w-3/4 flex-col items-center">
         <Dialog
            isOpen={isOpenModal}
            setIsOpen={setIsOpenModal}
            title="Enter your password to delete account"
         >
            <form
               className="flex flex-col gap-4 "
               onSubmit={handleSubmit(onSubmit)}
            >
               <LabelInput
                  className="!mb-0 border border-gray-300"
                  inputType="password"
                  register={register}
                  name="password"
                  errors={errors}
               />
               <Button
                  variant="white"
                  type="button"
                  isLoading={buttonLoading}
                  onClick={() => setIsOpenModal(false)}
               >
                  Go back to settings
               </Button>
               <Button
                  variant="primary"
                  type="submit"
                  isLoading={buttonLoading}
               >
                  Delete my account
               </Button>
            </form>
         </Dialog>

         <h2 className="mt-2 text-3xl font-bold">Delete your account</h2>
         <p className="my-3 text-center">
            If you click on this button, you will delete your account in our
            platform. Make sure you definitely want to do this - your account
            cannot be restored.
         </p>
         <Button
            onClick={() => setIsOpenModal(true)}
            variant="primary"
            type="button"
            label="Delete your account"
            className="mb-2"
         />
      </div>
   );
};

export default DeleteProfileForm;
