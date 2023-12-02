import FlashcardsLearnSection from "@/modules/flashcard/learn/flashcards-learn-section";
import { getLesson } from "@/utils/api-utils/get-lesson";
import { getCurrentUser } from "@/utils/api-utils/get-current-user";
import getJWT from "@/utils/get-server-jwt";
import { notFound } from "next/navigation";

const LessonPage = async ({
   params: { lessonName, userId },
}: {
   params: { lessonName: string; userId: string };
}) => {
   try {
      const JWT = getJWT();
      const lesson = await getLesson(userId, lessonName, JWT);

      if (lesson.isPublic) {
         return <FlashcardsLearnSection lesson={lesson} />;
      }

      const user = await getCurrentUser(JWT);
      const isUserOwner = lesson.owner.userId === user.userId;

      if (!isUserOwner) notFound();

      return <FlashcardsLearnSection lesson={lesson} />;
   } catch {
      return notFound();
   }
};

export default LessonPage;
