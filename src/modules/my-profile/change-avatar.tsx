import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import type { UserInfo } from "@/types/user-info";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface ChangeAvatarProps {
   profile: UserInfo;
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangeAvatar = ({ profile, isOpen, setIsOpen }: ChangeAvatarProps) => {
   const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);

   const [buttonLoading, setButtonLoading] = useState(false);
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: changeAvatarMutation, isPending } = useMutation({
      mutationFn: async () => {
         const JWT = getCookie("JWT") as string;

         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/updateAvatar`,
            {
               headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: JWT,
               },
               method: "PATCH",
               body: JSON.stringify({
                  avatar: selectedAvatar,
               }),
            }
         );
         return res.status;
      },

      onSettled: async status => {
         if (status === 200) {
            router.refresh();
            toast.success("Avatar has been changed");
            await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
         } else {
            toast.error("Error when changing avatar");
         }
         setButtonLoading(false);
      },
   });

   return (
      <Dialog title="Change your avatar" isOpen={isOpen} setIsOpen={setIsOpen}>
         <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
               {Array.from({ length: 16 }, (_, i) => i).map((_, index) => (
                  <button
                     disabled={isPending}
                     key={index + 1}
                     onClick={() => {
                        setSelectedAvatar(index + 1);
                        setButtonLoading(true);
                        changeAvatarMutation();
                     }}
                  >
                     <Image
                        width={64}
                        height={64}
                        alt={`Avatar number ${index + 1}`}
                        src={`/images/avatars/avatar_${index + 1}.png`}
                        className={classNames(
                           Number(selectedAvatar) - 1 === index &&
                              "border-2 border-black",
                           "rounded-full"
                        )}
                     />
                  </button>
               ))}
            </div>
            <Button
               type="button"
               variant="primary"
               className="mt-6 w-full"
               onClick={() => {
                  setButtonLoading(true);
                  setSelectedAvatar(null);
                  changeAvatarMutation();
               }}
               isLoading={buttonLoading}
            >
               Set default
            </Button>
         </div>
      </Dialog>
   );
};

export default ChangeAvatar;
