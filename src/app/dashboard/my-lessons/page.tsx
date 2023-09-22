import LessonsList from "@/modules/my-lessons/lessons-list";
import NewLessonForm from "@/modules/my-lessons/new-lesson-form";
import { FC } from "react";
import { cookies } from "next/headers";

const getUserLessons = async () => {
   const cookieStore = cookies();
   const JWT = cookieStore.get("JWT");

   const res = await fetch(`${process.env.URL}/api/user/lessons`, {
      headers: { Authorization: JWT?.value as string },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   return res.json();
};

const MyLessons: FC = async () => {
   const { data: lessons, refetch } = await getUserLessons();

   return (
      <div className="ml-0 grid gap-10 lg:grid-cols-[1fr_3fr]">
         <NewLessonForm />
         <LessonsList lessons={lessons} />
      </div>
   );
};

export default MyLessons;
