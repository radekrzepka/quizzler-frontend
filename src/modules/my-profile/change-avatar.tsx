import { UserInfo } from "@/types/user-info";
import { FC, useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import classNames from "classnames";
import Button from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Dialog from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";

interface ChangeAvatarProps {
   profile: UserInfo;
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangeAvatar: FC<ChangeAvatarProps> = ({
   profile,
   isOpen,
   setIsOpen,
}) => {
   const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);
   const [buttonLoading, setButtonLoading] = useState(false);
   const router = useRouter();
   const queryClient = useQueryClient();

   const { mutate: changeAvatarMutation } = useMutation({
      mutationFn: async () => {
         const JWT = getCookie("JWT") as string;

         const res = await fetch(`/api/user/updateAvatar`, {
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: JWT,
            },
            method: "PATCH",
            body: JSON.stringify({
               avatar: selectedAvatar,
            }),
         });

         return res.json();
      },

      onSettled: (res) => {
         if (res?.status === 200) {
            router.refresh();
            toast.success("Avatar has been changed");
            queryClient.invalidateQueries({ queryKey: ["profileData"] });
            setIsOpen(false);
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
                     key={index + 1}
                     onClick={() => setSelectedAvatar(index + 1)}
                  >
                     <Image
                        width={64}
                        height={64}
                        alt={`Avatar number ${index + 1}`}
                        src={`/images/avatars/avatar_${index + 1}.png`}
                        className={classNames(
                           Number(selectedAvatar) - 1 === index &&
                              "border-2 border-black",
                           "rounded-full",
                        )}
                     />
                  </button>
               ))}
            </div>
            <Button
               type="button"
               variant="primary"
               label="Change avatar"
               className="mt-6 w-full"
               onClick={() => {
                  setButtonLoading(true);
                  changeAvatarMutation();
               }}
               isLoading={buttonLoading}
            />
         </div>
      </Dialog>
   );
};

export default ChangeAvatar;
