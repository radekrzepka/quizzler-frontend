import LessonsList from "@/modules/my-lessons/lessons-list";
import NewLessonForm from "@/modules/my-lessons/new-lesson-form";
import type { Lesson } from "@/types/lesson";
import getJWT from "@/utils/get-server-jwt";

interface ApiResponse {
   data: Array<Lesson>;
}

const getUserLessons = async (): Promise<ApiResponse> => {
   const JWT = getJWT();

   const res = await fetch(`${process.env.URL}/api/user/lessons`, {
      headers: { Authorization: JWT as string },
      cache: "no-store",
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   const data = (await res.json()) as ApiResponse;

   return data;
};

const MyLessons = async () => {
   const { data: lessons } = await getUserLessons();

   return (
      <div className="ml-0 grid gap-4 xl:grid-cols-[1fr_3fr]">
         <NewLessonForm />
         <LessonsList lessons={lessons} />
      </div>
   );
};

export default MyLessons;
