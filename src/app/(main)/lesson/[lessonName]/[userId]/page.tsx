import FlashcardsLearnSection from "@/modules/flashcard/flashcards-learn-section";
import { getLesson } from "@/utils/api-utils/get-lesson";
import { getUser } from "@/utils/api-utils/get-user";
import getJWT from "@/utils/get-server-jwt";
import { notFound } from "next/navigation";

const LessonPage = async ({
   params: { lessonName, userId },
}: {
   params: { lessonName: string; userId: string };
}) => {
   try {
      const JWT = getJWT();
      const user = await getUser(JWT);
      const lesson = await getLesson(userId, lessonName, JWT);

      const isUserOwner = lesson.owner.userId === user.userId;

      if (!lesson.isPublic && !isUserOwner) notFound();

      return <FlashcardsLearnSection lesson={lesson} />;
   } catch {
      return notFound();
   }
};

export default LessonPage;
