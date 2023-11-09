import FlashcardsLearnSection from "@/modules/flashcard/flashcards-learn-section";
import { Flashcard } from "@/types/flashcard";
import { Lesson } from "@/types/lesson";
import { UserInfo } from "@/types/user-info";
import getJWT from "@/utils/get-jwt";

const getLesson = async (id: string) => {
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

const getUser = async () => {
   const JWT = getJWT();
   const res = await fetch(`${process.env.URL}/api/lesson/profile`, {
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
   const { data: lesson }: { data: Lesson } = await getLesson(params.id);
   const user: UserInfo = await getUser();

   const { userId } = user;
   const { flashcards } = lesson;

   //TODO: check if user is owner if not, redirect

   if (!userId) {
      return {
         redirect: {
            destination: "/dashboard",
            permanent: false,
         },
      };
   }

   return (
      <FlashcardsLearnSection lessonId={params.id} flashcards={flashcards} />
   );
};

export default LessonPage;
