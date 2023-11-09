import LessonsList from "@/modules/my-lessons/lessons-list";
import NewLessonForm from "@/modules/my-lessons/new-lesson-form";
import getJWT from "@/utils/get-jwt";

const getUserLessons = async () => {
   const JWT = getJWT();

   const res = await fetch(`${process.env.URL}/api/user/lessons`, {
      headers: { Authorization: JWT as string },
      cache: "no-store",
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   return res.json();
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
