import useCurrentUserInfo from "@/hooks/api-hooks/use-current-user-info";
import type { Lesson } from "@/types/lesson";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { getCookie } from "cookies-next";
import { useState } from "react";
import toast from "react-hot-toast";
import Dialog from "./dialog";
import SignInForm from "@/modules/auth/sign-in/sign-in-form";
import { SEARCH } from "@/utils/urls";
import { useSearchParams } from "next/navigation";

interface LikeLessonButtonProps {
   lesson: Lesson;
   className?: string;
}

const LikeLessonButton = ({ lesson, className }: LikeLessonButtonProps) => {
   const [isLiked, setIsLiked] = useState(lesson.isLiked);
   const [openLoginModal, setOpenLoginModal] = useState(false);
   const { data: profile } = useCurrentUserInfo();
   const serachParams = useSearchParams();
   const query = serachParams.get("query");

   const mutation = useMutation({
      mutationFn: async () => {
         const JWT = getCookie("JWT") as string;

         const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/lesson/like?LessonId=${lesson.lessonId}&Like=${isLiked}`,
            {
               headers: {
                  Authorization: JWT,
                  Accept: "text/json",
               },
               method: "POST",
            }
         );

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         return response;
      },
      onError: () => {
         toast.error(`Error during ${isLiked ? "liking" : "disliking"} lesson`);
         setIsLiked(prevLiked => !prevLiked);
      },
   });

   const likesNumber =
      lesson.likesCount +
      (isLiked && !lesson.isLiked ? 1 : 0) -
      (!isLiked && lesson.isLiked ? 1 : 0);

   return (
      <>
         <Dialog
            isOpen={openLoginModal}
            setIsOpen={setOpenLoginModal}
            backgroundColor="#dfddee"
         >
            <SignInForm
               nextPath={SEARCH(query as string)}
               backPath={SEARCH(query as string)}
               onLogIn={() => setOpenLoginModal(false)}
               onBack={() => setOpenLoginModal(false)}
               header="To like lesson, log in"
            />
         </Dialog>
         <div className={classNames(className, "flex gap-1")}>
            <p className="font-bold">{likesNumber}</p>
            <button
               onClick={async event => {
                  if (!profile) {
                     setOpenLoginModal(true);
                     return;
                  }
                  event.stopPropagation();
                  setIsLiked(prevLiked => !prevLiked);
                  await mutation.mutateAsync();
               }}
               className={`relative h-6 w-6 bg-center bg-no-repeat transition-all duration-300 ease-in-out ${
                  isLiked ? "bg-liked-heart" : "bg-unliked-heart"
               }`}
            ></button>
         </div>
      </>
   );
};

export default LikeLessonButton;
