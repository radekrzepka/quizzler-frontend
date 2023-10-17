import { FC } from "react";
import { UserInfo } from "@/types/user-info";
import ProfileCard from "@/modules/my-profile/profile-card";
import ProfileChangeForms from "@/modules/my-profile/profile-change-forms";
import { LogData } from "@/types/log-data";
import getJWT from "@/utils/get-jwt-server";


const fetchFromAPI = async (endpoint: string, JWT: string | undefined) => {
   const res = await fetch(`${process.env.URL}${endpoint}`, {
      headers: { Authorization: JWT as string },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   return res.json();
}

const getProfileData = async () => {
   const JWT = getJWT();
   return (await fetchFromAPI("/api/user/profile", JWT)).data;
};

const getStatsData = async(): Promise<[Date[], LogData[]]> => {
   const JWT = getJWT();
   const [createdRes, learnedRes] = await Promise.all([
     fetchFromAPI("/api/user/flashcardsCreated", JWT),
     fetchFromAPI("/api/user/logs", JWT),
   ]);
 
   return [createdRes.data, learnedRes.data];
};
   
const MyProfile: FC = async () => {
   const profileData: UserInfo =    
      await getProfileData(); 
   const [createdData, learnedData]: [Date[], LogData[]] = 
      await getStatsData();

   return (
      <div className="ml-0 grid gap-10 lg:grid-cols-[3fr_2fr]">
         <ProfileCard profile={profileData} createdDates={createdData} learnedDates={learnedData}/>
         <ProfileChangeForms profile={profileData} />
      </div>
   );
};

export default MyProfile;
