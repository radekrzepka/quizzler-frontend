import EditLesson from "@/modules/lesson/edit-lesson";
import { cookies } from "next/headers";

const getLesson = async (id: string) => {
   const cookieStore = cookies();
   const JWT = cookieStore.get("JWT");

   const res = await fetch(`${process.env.URL}/api/lesson/${id}`, {
      headers: { Authorization: JWT?.value as string },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   return res.json();
};

const Lesson = async ({
   params,
   searchParams,
}: {
   params: { id: string };
   searchParams: { [key: string]: string };
}) => {
   const lesson = await getLesson(params.id);
   const editLesson = searchParams?.edit === "true";

   if (editLesson) return <EditLesson lesson={lesson} />;

   return <div>Lesson {params.id}</div>;
};

export default Lesson;
