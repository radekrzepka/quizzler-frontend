import EditLesson from "@/modules/lesson/edit-lesson";

const LessonPage = ({
   params,
   searchParams,
}: {
   params: { id: string };
   searchParams: { [key: string]: string };
}) => {
   const editLesson = searchParams?.edit === "true";

   if (editLesson) return <EditLesson lessonId={params.id} />;

   return <div></div>;
};

export default LessonPage;
