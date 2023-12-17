import LessonList from "@/components/dashboard/dashboard-lesson-list";
import DashboardWeekChart from "@/components/dashboard/dashboard-week-chart";
import LessonCardDashboard from "@/modules/dashboard/lesson-card-dashboard";
import type { Lesson } from "@/types/lesson";
import getJWT from "@/utils/get-server-jwt";

const getFromAPI = async <T,>(endpoint: string): Promise<T> => {
   const JWT = getJWT();
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      headers: { Authorization: JWT as string },
   });
   if (res.status === 404) {
      return {} as T;
   }
   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   const data = (await res.json()) as Promise<T>;
   return data;
};

const Dashboard = async () => {
   const lastLesson = await getFromAPI<Lesson>(`/user/lastLesson`);
   const trendingLessons =
      await getFromAPI<Array<Lesson>>(`/lesson/topLessons`);
   const likedLessons = await getFromAPI<Array<Lesson>>(`/user/likedLessons`);
   const activity = await getFromAPI<Array<Date>>(`/user/lastWeekActivity`);

   return (
      <div className="mt-5 grid grid-cols-1 gap-10 text-background lg:grid-cols-3 lg:grid-rows-[1r_1fr_1fr] xl:grid-cols-[1fr_3fr_1fr]">
         <div className="grid w-full place-items-center rounded-xl bg-text pb-3 align-middle lg:row-span-2">
            <h2 className="w-full pt-2 text-center text-4xl font-extrabold">
               Continue Learning
            </h2>
            {Object.keys(lastLesson).length === 0 ? (
               <div className="grid w-full place-items-center pb-6 pt-2">
                  <h2 className="pt-4 text-2xl font-bold">
                     Ready to Learn Something New?
                  </h2>
                  <p className="text-xl">
                     Browse our lessons to find topics that interest you.
                  </p>
               </div>
            ) : (
               <LessonCardDashboard lesson={lastLesson} />
            )}
         </div>

         <div className="grid w-full rounded-xl bg-text pb-2 lg:col-start-1 lg:row-start-3 lg:min-h-[60vh]">
            <h2 className="w-full pt-2 text-center text-4xl font-extrabold lg:h-full">
               Trending
            </h2>
            <div className="max-h-[30vh] lg:max-h-[50vh]">
               <LessonList lessons={trendingLessons} />
            </div>
         </div>
         <main className="hidden rounded-xl bg-text lg:row-span-3 lg:block"></main>
         <div className="row-start-1 lg:col-start-3 lg:h-[10vh]">
            <h2 className="w-full text-center text-4xl font-extrabold text-text">
               Weekly activity
            </h2>
            <DashboardWeekChart activity={activity}></DashboardWeekChart>
         </div>
         <div className="grid rounded-xl bg-text lg:col-start-3 lg:row-span-2 lg:row-start-2">
            <h2 className="w-full text-center text-4xl font-extrabold text-background">
               Favorites
            </h2>
            {likedLessons.length === 0 ? (
               <div className="text-center lg:min-h-[70vh]">
                  <p className="text-2xl font-bold">
                     You haven&apos;t added any lessons to your favorites yet.
                  </p>
                  <div className="w-full text-xl">
                     Explore lessons and click the{" "}
                     <div className="-mb-2 inline-block h-6 w-6 bg-liked-heart"></div>{" "}
                     icon to add them here.
                  </div>
               </div>
            ) : (
               <div className="max-h-[30vh] lg:min-h-[70vh]">
                  <LessonList lessons={likedLessons} />
               </div>
            )}
         </div>
      </div>
   );
};

export default Dashboard;
