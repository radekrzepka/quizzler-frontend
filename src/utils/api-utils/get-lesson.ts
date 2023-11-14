import type { Lesson } from "@/types/lesson";

export const getLesson = async (
   userId: string,
   lessonName: string,
   JWT?: string
) => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/lesson/byUser/${userId}/${lessonName}`,
      {
         headers: { Authorization: JWT as string },
      }
   );

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   return (await res.json()) as Lesson;
};
