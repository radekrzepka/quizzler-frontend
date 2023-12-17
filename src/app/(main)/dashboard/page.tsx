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
      <div className="grid text-background md:min-h-[85vh] md:grid-cols-[1fr_1fr_1fr] md:gap-10 xl:grid-cols-[1fr_3fr_1fr]">
         <div className="mt-5 rounded-xl md:h-full ">
            <div className="md:hidden">
               <h2 className="w-full pt-2 text-center text-4xl font-extrabold text-text">
                  Weekly activity
               </h2>
               <DashboardWeekChart activity={activity}></DashboardWeekChart>
            </div>
            <div className="flex flex-wrap justify-center pb-4 md:h-full">
               <div className="mt-4 flex w-full flex-wrap justify-center rounded-xl bg-text pb-3 md:mt-0 md:h-1/4 md:pb-24">
                  <h2 className="w-full pt-2 text-center text-4xl font-extrabold">
                     Continue learning
                  </h2>
                  {Object.keys(lastLesson).length === 0 ? (
                     <div className="flex h-full w-full items-center justify-center pb-6 pt-2">
                        <h2 className="text-2xl font-bold">no lesson yet :(</h2>
                     </div>
                  ) : (
                     <LessonCardDashboard lesson={lastLesson} />
                  )}
               </div>
               <div className="mt-2 flex w-full flex-wrap justify-center rounded-xl bg-text pb-2 md:mt-0">
                  <h2 className="mt-3 w-full pt-2 text-center text-4xl font-extrabold md:mt-0">
                     Trending
                  </h2>
                  <div className="max-h-[50vh]">
                     <LessonList lessons={trendingLessons} />
                  </div>
               </div>
            </div>
         </div>
         <main className="mt-5 hidden rounded-xl bg-text md:block"></main>
         <div className="h-full">
            <div className="hidden md:block">
               <h2 className="w-full text-center text-4xl font-extrabold text-text">
                  Weekly activity
               </h2>
               <DashboardWeekChart activity={activity}></DashboardWeekChart>
            </div>
            <div className="flex flex-wrap rounded-xl">
               <h2 className="mt-8 w-full text-center text-4xl font-extrabold text-accent md:mt-2">
                  Favorites
               </h2>
               <div className="h-full w-full rounded-xl bg-text ">
                  {Object.keys(likedLessons).length === 0 ? (
                     <div className="flex h-full w-full  ">
                        <p className="w-full pt-6 text-center text-2xl font-bold">
                           like something!
                        </p>
                     </div>
                  ) : (
                     <LessonList lessons={likedLessons} />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
