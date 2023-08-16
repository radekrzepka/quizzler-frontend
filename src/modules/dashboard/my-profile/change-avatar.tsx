import Modal from "@/components/ui/modal";
import { UserInfo } from "@/types/user-info";
import { FC, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import Button from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface ChangeAvatarProps {
   profile: UserInfo;
   closeModalFunction: () => void;
}

const ChangeAvatar: FC<ChangeAvatarProps> = ({
   profile,
   closeModalFunction,
}) => {
   const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar);
   const [buttonLoading, setButtonLoading] = useState(false);
   const router = useRouter();

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

         const data = await res.json();

         return data;
      },

      onSettled: (res) => {
         console.log(res);
         if (res?.status === 200) {
            router.refresh();
            toast.success("Avatar has been changed");
         }
         setButtonLoading(false);
      },
   });

   return (
      <Modal closeModalFunction={closeModalFunction}>
         <div className="flex flex-col items-center">
            <h2 className="mb-3 text-center text-3xl font-bold">
               Change your avatar
            </h2>
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
                           selectedAvatar - 1 === index &&
                              "border border-black",
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
      </Modal>
   );
};

export default ChangeAvatar;
