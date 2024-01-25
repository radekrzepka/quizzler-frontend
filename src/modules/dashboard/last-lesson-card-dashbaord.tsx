"use client";

import type { Lesson } from "@/types/lesson";
import getFromAPIClient from "@/utils/get-from-api-client";
import { useQuery } from "@tanstack/react-query";
import LessonCardDashboard from "./lesson-card-dashboard";

interface LastLessonCardDashboardProps {
   initialLastLesson: Lesson;
}
const LastLessonCardDashboard = ({
   initialLastLesson,
}: LastLessonCardDashboardProps) => {
   const { data: lesson } = useQuery<Lesson>({
      queryKey: ["dashboard-last-lesson"],
      queryFn: async () => await getFromAPIClient("/user/lastLesson"),
      initialData: initialLastLesson,
   });

   return <LessonCardDashboard lesson={lesson} />;
};

export default LastLessonCardDashboard;
