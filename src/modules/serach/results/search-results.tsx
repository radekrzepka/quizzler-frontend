import type { ApiResponse } from "@/app/(main)/search/page";
import LessonSerachCard from "./lesson-serach-card";
import UserSerachCard from "./user-serach-card";

interface SerachResultsProps {
   results: ApiResponse;
   query: string;
}

const SerachResults = ({ results, query }: SerachResultsProps) => {
   const { lessons, users } = results;

   return (
      <div>
         <div>
            <h2 className="mb-6 text-4xl">Results for &quot;{query}&quot; </h2>
            {lessons.length !== 0 && (
               <>
                  <h2 className="text-2xl">Lessons:</h2>
                  <div className="mb-6 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                     {lessons.map(lesson => (
                        <LessonSerachCard
                           key={lesson.lessonId}
                           lesson={lesson}
                           query={query}
                        />
                     ))}
                  </div>
               </>
            )}
            {users.length !== 0 && (
               <>
                  <h2 className="text-2xl">Users:</h2>
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                     {users.map(user => (
                        <UserSerachCard
                           key={user.userId}
                           user={user}
                           query={query}
                        />
                     ))}
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default SerachResults;
