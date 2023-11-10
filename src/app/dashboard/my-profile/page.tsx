import type { UserInfo } from "@/types/user-info";
import ProfileCard from "@/modules/my-profile/profile-card";
import ProfileChangeForms from "@/modules/my-profile/profile-change-forms";
import type { LogData } from "@/types/log-data";
import getJWT from "@/utils/get-server-jwt";

interface ApiResponseProfileData {
   data: UserInfo;
}
interface ApiResponseLearnedData {
   data: Array<LogData>;
}
interface ApiResponseCreatedData {
   data: Array<Date>;
}

const getFromAPI = async <T,>(
   endpoint: string,
   JWT: string | undefined
): Promise<T> => {
   const res = await fetch(`${process.env.URL}${endpoint}`, {
      headers: { Authorization: JWT as string },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   const data = (await res.json()) as Promise<T>;

   return data;
};

const getProfileData = async (): Promise<ApiResponseProfileData> => {
   const JWT = getJWT();
   const res = getFromAPI<ApiResponseProfileData>("/api/user/profile", JWT);
   return res;
};

const getStatsData = async (): Promise<[Array<Date>, Array<LogData>]> => {
   const JWT = getJWT();
   const [createdRes, learnedRes] = await Promise.all([
      getFromAPI<ApiResponseCreatedData>("/api/user/flashcardsCreated", JWT),
      getFromAPI<ApiResponseLearnedData>("/api/user/logs", JWT),
   ]);

   return [createdRes.data, learnedRes.data];
};

const MyProfile = async () => {
   const { data: profileData } = await getProfileData();
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
