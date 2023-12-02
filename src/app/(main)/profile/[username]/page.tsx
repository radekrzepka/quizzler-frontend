import ProfilePage from "@/modules/profile/profile-page";
import { getUser } from "@/utils/api-utils/get-user";
import { getUserLessons } from "@/utils/api-utils/get-user-lessons";
import { notFound } from "next/navigation";

const Profile = async ({
   params: { username },
}: {
   params: { username: string };
}) => {
   try {
      const user = await getUser(username);
      const lessons = await getUserLessons(user.userId.toString());
      return <ProfilePage user={user} lessons={lessons} />;
   } catch {
      return notFound();
   }
};

export default Profile;
