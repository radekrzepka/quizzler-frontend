import LessonList from "@/components/dashboard/dashboard-lesson-list";
import DashboardWeekChart from "@/components/dashboard/dashboard-week-chart";
import LastLessonCardDashboard from "@/modules/dashboard/last-lesson-card-dashbaord";
import type { Lesson } from "@/types/lesson";
import getFromAPI from "@/utils/get-from-api-server";

const Dashboard = async () => {
   const [lastLesson, activity, topLessons, likedLessons] = await Promise.all([
      getFromAPI<Lesson>(`/user/lastLesson`),
      getFromAPI<Array<Date>>(`/user/lastWeekActivity`),
      getFromAPI<Array<Lesson>>(`/lesson/topLessons`),
      getFromAPI<Array<Lesson>>(`/user/likedLessons`),
   ]);
   return (
      <div className="grid grid-cols-1 gap-10 text-background xl:grid-cols-[1fr_3fr_1fr] xl:grid-rows-[1r_1fr_1fr]">
         <div className="grid  rounded-xl bg-text xl:row-span-2">
            <h2 className=" pt-5 text-center text-4xl font-extrabold">
               Continue Learning
            </h2>
            {Object.keys(lastLesson).length === 0 ? (
               <div className="mb-10  px-2 pb-6 pt-2 text-center">
                  <h2 className="pt-4 text-2xl font-bold">
                     Ready to Learn Something New?
                  </h2>
                  <p className="text-xl">
                     Browse our lessons to find topics that interest you.
                  </p>
               </div>
            ) : (
               <div className="mb-5 grid place-items-center">
                  <LastLessonCardDashboard initialLastLesson={lastLesson} />
               </div>
            )}
         </div>
         <div className="grid rounded-xl bg-text pb-2 xl:col-start-1 xl:row-start-3">
            <h2 className=" text-center text-4xl font-extrabold xl:pt-5">
               Trending
            </h2>
            <div className="max-h-[30vh] xl:max-h-[50vh]">
               <LessonList
                  initialLessons={topLessons}
                  queryKey="dashboard-top-lessons"
               />
            </div>
         </div>
         <main className="hidden rounded-xl bg-text xl:row-span-3 xl:block">
            <div className="flex  flex-col items-center p-4">
               <h1 className="text-5xl font-bold">Welcome to Quizzler!</h1>
               <p className="pt-2 text-2xl">
                  Here you can learn new things and test your knowledge.
               </p>
            </div>
         </main>
         <div className="row-start-1 xl:col-start-3 ">
            <h2 className=" text-center text-4xl font-extrabold text-text">
               Weekly activity
            </h2>
            <DashboardWeekChart activity={activity}></DashboardWeekChart>
         </div>
         <div className="grid rounded-xl bg-text px-2 text-center xl:col-start-3 xl:row-span-2 xl:row-start-2">
            <h2 className=" pt-5 text-center text-4xl font-extrabold text-background">
               Favorites
            </h2>
            {likedLessons.length === 0 ? (
               <div className="text-center xl:min-h-[70vh]">
                  <h2 className="pt-4 text-2xl font-bold">
                     Ready to Learn Something New?
                  </h2>
                  <p className="text-xl">
                     Browse our lessons to find topics that interest you.
                  </p>
               </div>
            ) : (
               <div className="max-h-[30vh] xl:min-h-[70vh]">
                  <LessonList
                     initialLessons={likedLessons}
                     queryKey="dashboard-liked-lessons"
                  />
               </div>
            )}
         </div>
      </div>
   );
};

export default Dashboard;
