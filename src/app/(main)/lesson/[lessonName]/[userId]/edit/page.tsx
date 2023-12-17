import EditLesson from "@/modules/lesson/edit-lesson/edit-lesson";
import { getLesson } from "@/utils/api-utils/get-lesson";
import { getServerCurrentUser } from "@/utils/api-utils/get-server-current-user";
import { notFound } from "next/navigation";
import getServerJWT from "@/utils/get-server-jwt";

const EditLessonPage = async ({
   params: { lessonName, userId },
}: {
   params: { lessonName: string; userId: string };
}) => {
   try {
      const JWT = getServerJWT();
      const user = await getServerCurrentUser();
      const lesson = await getLesson(userId, lessonName, JWT);

      const isUserOwner = lesson.owner.userId === user?.userId;

      if ((!lesson.isPublic && !isUserOwner) || !isUserOwner) notFound();

      return <EditLesson lesson={lesson} />;
   } catch {
      return notFound();
   }
};

export default EditLessonPage;
