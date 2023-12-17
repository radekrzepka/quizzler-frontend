import FlashcardsLearnSection from "@/modules/flashcard/learn/flashcards-learn-section";
import { getLesson } from "@/utils/api-utils/get-lesson";
import { getServerCurrentUser } from "@/utils/api-utils/get-server-current-user";
import getServerJWT from "@/utils/get-server-jwt";
import { notFound } from "next/navigation";

const LessonPage = async ({
   params: { lessonName, userId },
}: {
   params: { lessonName: string; userId: string };
}) => {
   try {
      const JWT = getServerJWT();
      const lesson = await getLesson(userId, lessonName, JWT);

      if (lesson.isPublic) {
         return <FlashcardsLearnSection lesson={lesson} />;
      }

      const user = await getServerCurrentUser();
      const isUserOwner = lesson.owner.userId === user?.userId;

      if (!isUserOwner) notFound();

      return <FlashcardsLearnSection lesson={lesson} />;
   } catch {
      return notFound();
   }
};

export default LessonPage;
