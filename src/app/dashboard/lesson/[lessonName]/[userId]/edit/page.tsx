import EditLesson from "@/modules/lesson/edit-lesson";
import { getLesson } from "@/utils/api-utils/get-lesson";
import { getUser } from "@/utils/api-utils/get-user";
import { notFound } from "next/navigation";
import getJWT from "@/utils/get-server-jwt";

const EditLessonPage = async ({
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

      return <EditLesson lesson={lesson} userId={user.userId.toString()} />;
   } catch {
      return notFound();
   }
};

export default EditLessonPage;
