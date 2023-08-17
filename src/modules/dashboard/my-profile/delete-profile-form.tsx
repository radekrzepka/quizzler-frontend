import { FC, useState } from "react";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import LabelInput from "@/components/ui/label-input";

const DeleteProfileForm: FC = ({}) => {
   const [showModal, setShowModal] = useState(false);
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

         const data = await res.json();

         return data;
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
         {showModal && (
            <Modal closeModalFunction={() => setShowModal(false)}>
               <form
                  className="flex w-4/5 flex-col gap-4 lg:w-3/5 xl:w-2/5"
                  onSubmit={handleSubmit(onSubmit)}
               >
                  <LabelInput
                     label="Enter your password to delete account:"
                     inputType="password"
                     register={register}
                     name="password"
                     errors={errors}
                  />
                  <Button
                     variant="primary"
                     type="submit"
                     isLoading={buttonLoading}
                  >
                     Delete my account
                  </Button>
               </form>
            </Modal>
         )}
         <h2 className="mt-2 text-3xl font-bold">Delete your account</h2>
         <p className="my-3 text-center">
            If you click on this button, you will delete your account in our
            platform. Make sure you definitely want to do this - your account
            cannot be restored.
         </p>
         <Button
            onClick={() => setShowModal(true)}
            variant="primary"
            type="button"
            label="Delete your account"
            className="mb-2"
         />
      </div>
   );
};

export default DeleteProfileForm;
