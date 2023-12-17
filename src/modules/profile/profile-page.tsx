import type { Lesson } from "@/types/lesson";
import type { UserInfo } from "@/types/user-info";
import MyLessonList from "../my-lessons/my-lesson-list";
import ProfileCard from "./profile-card";

interface ProfilePageProps {
   user: UserInfo;
   lessons: Array<Lesson>;
}

const ProfilePage = ({ user, lessons }: ProfilePageProps) => {
   return (
      <div className="ml-0 gap-4 lg:grid lg:grid-cols-[1fr_3fr]">
         <ProfileCard user={user} />
         <MyLessonList lessons={lessons} />
      </div>
   );
};

export default ProfilePage;
