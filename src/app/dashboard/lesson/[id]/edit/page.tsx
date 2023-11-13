import EditLesson from "@/modules/lesson/edit-lesson";
import { getLesson } from "@/utils/api-utils/get-lesson";
import { getUser } from "@/utils/api-utils/get-user";
import { notFound } from "next/navigation";

const EditLessonPage = async ({ params }: { params: { id: string } }) => {
   const user = await getUser();

   try {
      const lesson = await getLesson(params.id);
      const isUserOwner = lesson.owner.userId === user.userId;
      if (!isUserOwner) return notFound();
   } catch {
      return notFound();
   }

   return <EditLesson lessonId={params.id} />;
};

export default EditLessonPage;
