"use client";

import EditLesson from "@/modules/lesson/edit-lesson";
import { Lesson } from "@/types/lesson";
import getJWT from "@/utils/get-jwt";
import { useQuery } from "@tanstack/react-query";

const getLesson = async (id: string) => {
   const JWT = getJWT();
   const res = await fetch(`/api/lesson/${id}`, {
      headers: { Authorization: JWT as string},
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   const { data } = await res.json();

   return data;
};

const Lesson = ({
   params,
   searchParams,
}: {
   params: { id: string };
   searchParams: { [key: string]: string };
}) => {
   const { data: lesson, refetch } = useQuery<Lesson>({
      queryKey: ["lesson", params.id],
      queryFn: () => getLesson(params.id),
   });
   const editLesson = searchParams?.edit === "true";

   if (editLesson && lesson)
      return <EditLesson lesson={lesson} refetchLesson={refetch} />;

   return <div></div>;
};

export default Lesson;
