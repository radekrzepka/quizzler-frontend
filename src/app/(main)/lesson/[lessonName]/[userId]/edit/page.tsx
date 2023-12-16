import EditLesson from "@/modules/lesson/edit-lesson/edit-lesson";
import { getLesson } from "@/utils/api-utils/get-lesson";
import { getCurrentUser } from "@/utils/api-utils/get-current-user";
import { notFound } from "next/navigation";
import getJWT from "@/utils/get-server-jwt";

const EditLessonPage = async ({
   params: { lessonName, userId },
}: {
   params: { lessonName: string; userId: string };
}) => {
   try {
      const JWT = getJWT();
      const user = await getCurrentUser(JWT);
      const lesson = await getLesson(userId, lessonName, JWT);

      const isUserOwner = lesson.owner.userId === user?.userId;

      if (!lesson.isPublic || !isUserOwner) notFound();

      return <EditLesson lesson={lesson} userId={user.userId.toString()} />;
   } catch {
      return notFound();
   }
};

export default EditLessonPage;
