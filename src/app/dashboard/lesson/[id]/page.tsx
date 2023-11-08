import FlashcardsLearnSection from "@/modules/flashcard/flashcards-learn-section";
import { Flashcard } from "@/types/flashcard";
import getJWT from "@/utils/get-jwt";

const getFlashcards = async (id: string) => {
   const JWT = getJWT();
   const res = await fetch(`${process.env.URL}/api/lesson/${id}`, {
      headers: {
         Authorization: JWT as string,
      },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   return res.json();
};

const LessonPage = async ({ params }: { params: { id: string } }) => {
   const {
      data: { flashcards },
   }: { data: { flashcards: Flashcard[] } } = await getFlashcards(params.id);

   return (
      <FlashcardsLearnSection lessonId={params.id} flashcards={flashcards} />
   );
};

export default LessonPage;
