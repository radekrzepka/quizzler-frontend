import type { Lesson } from "@/types/lesson";

export const getUserLessons = async (userId: string) => {
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/lessons`
   );

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   return (await res.json()) as Array<Lesson>;
};
