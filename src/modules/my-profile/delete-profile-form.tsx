import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import LabelInput from "@/components/ui/label-input";
import { BASE_PATH } from "@/utils/urls";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const DeleteProfileForm = () => {
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [buttonLoading, setButtonLoading] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<{ password: string }>();
   const router = useRouter();

   const { mutate: deleteMutation } = useMutation({
      mutationFn: async (password: string) => {
         const JWT = getCookie("JWT") as string;

         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/delete?userPassword=${password}`,
            {
               headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: JWT,
               },
               method: "DELETE",
            }
         );
         return res.status;
      },

      onSettled: status => {
         if (status === 200) {
            deleteCookie("JWT");
            toast.success("Account has been deleted");
            router.push(BASE_PATH);
         } else {
            setButtonLoading(false);
            toast.error("Please provide correct password");
         }
      },
   });

   const onSubmit: SubmitHandler<{ password: string }> = ({ password }) => {
      setButtonLoading(true);
      deleteMutation(password);
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
               <Button type="submit" isLoading={buttonLoading}>
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
         <Button onClick={() => setIsOpenModal(true)} className="mb-2">
            Delete your account
         </Button>
      </div>
   );
};

export default DeleteProfileForm;
