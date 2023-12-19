import type { Lesson } from "@/types/lesson";
import type { UserInfo } from "@/types/user-info";
import LessonsList from "../my-lessons/lessons-list";
import ProfileCard from "./profile-card";

interface ProfilePageProps {
   user: UserInfo;
   lessons: Array<Lesson>;
}

const ProfilePage = ({ user, lessons }: ProfilePageProps) => {
   return (
      <div className="ml-0 flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_3fr]">
         <ProfileCard user={user} />
         <LessonsList lessons={lessons} />
      </div>
   );
};

export default ProfilePage;
