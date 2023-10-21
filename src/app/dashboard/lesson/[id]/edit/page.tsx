import EditLesson from "@/modules/lesson/edit-lesson";

const EditLessonPage = ({ params }: { params: { id: string } }) => {
   return <EditLesson lessonId={params.id} />;
};

export default EditLessonPage;
