import FlashcardsLearnSection from "@/modules/flashcard/flashcards-learn-section";
import type { Lesson } from "@/types/lesson";
import getJWT from "@/utils/get-server-jwt";

const getLesson = async (id: string): Promise<Lesson> => {
   const JWT = getJWT();
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lesson/${id}`, {
      headers: {
         Authorization: JWT as string,
      },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   const data = (await res.json()) as Lesson;

   return data;
};

const LessonPage = async ({ params }: { params: { id: string } }) => {
   const lesson = await getLesson(params.id);

   return (
      <FlashcardsLearnSection
         lessonId={params.id}
         flashcards={lesson.flashcards}
      />
   );
};

export default LessonPage;
