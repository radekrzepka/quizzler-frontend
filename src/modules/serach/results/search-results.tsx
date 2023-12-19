import type { ApiResponse } from "@/app/(main)/search/page";
import LessonSerachCard from "./lesson-serach-card";
import UserSerachCard from "./user-serach-card";
import NoResultsFound from "./no-results-found";

interface SerachResultsProps {
   results: ApiResponse;
   query: string;
}

const SerachResults = ({ results, query }: SerachResultsProps) => {
   const { lessons, users } = results;

   return (
      <>
         <h2 className="mb-6 text-4xl">Results for &quot;{query}&quot; </h2>
         <h2 className="text-3xl">Lessons:</h2>
         <div className="mb-6 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {lessons.length === 0 ? (
               <NoResultsFound resultType="lessons" />
            ) : (
               lessons.map(lesson => (
                  <LessonSerachCard key={lesson.lessonId} lesson={lesson} />
               ))
            )}
         </div>
         <h2 className="text-3xl">Users:</h2>
         <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {users.length === 0 ? (
               <NoResultsFound resultType="users" />
            ) : (
               users.map(user => (
                  <UserSerachCard key={user.userId} user={user} />
               ))
            )}
         </div>
      </>
   );
};

export default SerachResults;
