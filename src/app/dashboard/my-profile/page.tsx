import type { UserInfo } from "@/types/user-info";
import ProfileCard from "@/modules/my-profile/profile-card";
import ProfileChangeForms from "@/modules/my-profile/profile-change-forms";
import type { LogData } from "@/types/log-data";
import getJWT from "@/utils/get-server-jwt";

const getFromAPI = async <T,>(
   endpoint: string,
   JWT: string | undefined
): Promise<T> => {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      headers: { Authorization: JWT as string },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   const data = (await res.json()) as Promise<T>;
   return data;
};

const getProfileData = async (): Promise<UserInfo> => {
   const JWT = getJWT();
   const res = await getFromAPI<UserInfo>(`/user/profile`, JWT);
   return res;
};

const getStatsData = async (): Promise<[Array<Date>, Array<LogData>]> => {
   const JWT = getJWT();
   const [createdRes, learnedRes] = await Promise.all([
      getFromAPI<Array<Date>>("/user/flashcardsCreated", JWT),
      getFromAPI<Array<LogData>>("/user/logs", JWT),
   ]);
   return [createdRes, learnedRes];
};

const MyProfile = async () => {
   const profileData = await getProfileData();
   const [createdData, learnedData] = await getStatsData();
   return (
      <div className="ml-0 grid gap-10 lg:grid-cols-[3fr_2fr]">
         <ProfileCard
            profile={profileData}
            createdDates={createdData}
            learnedDates={learnedData}
         />
         <ProfileChangeForms profile={profileData} />
      </div>
   );
};

export default MyProfile;
