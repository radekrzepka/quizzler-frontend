import MyLessonList from "@/modules/my-lessons/my-lesson-list";
import NewLessonForm from "@/modules/lesson/new-lesson/new-lesson-form";
import type { Lesson } from "@/types/lesson";
import getServerJWT from "@/utils/get-server-jwt";

const getUserLessons = async (): Promise<Array<Lesson>> => {
   const JWT = getServerJWT();

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
      <div className="ml-0 gap-4 lg:grid lg:grid-cols-[1fr_3fr]">
         <NewLessonForm />
         <MyLessonList lessons={lessons} />
      </div>
   );
};

export default MyLessons;
