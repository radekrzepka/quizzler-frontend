import type { Lesson } from "@/types/lesson";
import type { UserInfo } from "@/types/user-info";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import LessonSerachCard from "./lesson-serach-card";

interface ApiResponse {
   users: Array<UserInfo>;
   lessons: Array<Lesson>;
}

const RECOMMENDED_LESSONS_NUMBER = 5;

const getSearchResults = async (query: string | null) => {
   const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${
      query
         ? `/search/${query}`
         : `/search/topLessons/${RECOMMENDED_LESSONS_NUMBER}`
   }`;

   const res = await fetch(apiUrl);

   return query
      ? ((await res.json()) as ApiResponse)
      : ((await res.json()) as Array<Lesson>);
};

const SerachResults = () => {
   const serachParams = useSearchParams();
   const query = serachParams.get("query");

   const { data, isPending, isError } = useQuery({
      queryKey: ["search", query],
      queryFn: () => getSearchResults(query),
   });

   console.log(data, isPending, isError);

   if (isPending || isError) return null;

   if (Array.isArray(data))
      return (
         <div>
            <h2 className="text-3xl font-bold">Recommended lessons: </h2>
            <div className="flex flex-col gap-1">
               {data.map(lesson => (
                  <LessonSerachCard key={lesson.lessonId} lesson={lesson} />
               ))}
            </div>
         </div>
      );

   return (
      <div>
         <div>
            <h2 className="">Lessons: </h2>
            <div className="flex flex-col gap-1">
               {data.lessons.map(lesson => (
                  <LessonSerachCard key={lesson.lessonId} lesson={lesson} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default SerachResults;
