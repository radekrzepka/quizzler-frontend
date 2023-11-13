import type { Lesson } from "@/types/lesson";
import { getCookie } from "cookies-next";

export const getLesson = async (id: string) => {
   const JWT = getCookie("JWT") as string;

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesson/${id}`, {
      headers: { Authorization: JWT },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   return (await res.json()) as Lesson;
};
