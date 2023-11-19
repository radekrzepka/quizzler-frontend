import LessonsList from "@/modules/my-lessons/lessons-list";
import NewLessonForm from "@/modules/my-lessons/new-lesson-form";
import type { Lesson } from "@/types/lesson";
import getJWT from "@/utils/get-server-jwt";

const getUserLessons = async (): Promise<Array<Lesson>> => {
   const JWT = getJWT();

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/lessons`, {
      headers: { Authorization: JWT as string },
      cache: "no-store",
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   const data = (await res.json()) as Array<Lesson>;

   return data;
};

const MyLessons = async () => {
   const lessons = await getUserLessons();

   return (
      <div className="ml-0 grid gap-4 xl:grid-cols-[1fr_4fr]">
         <NewLessonForm />
         <LessonsList lessons={lessons} />
      </div>
   );
};

export default MyLessons;
