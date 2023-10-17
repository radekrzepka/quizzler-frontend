"use client";

import { UserInfo } from "@/types/user-info";
import { FC, useMemo, useState } from "react";
import LineChart from "@/components/chart/line-chart";
import ChartDateFilters from "@/components/chart/chart-date-filters";
import {
  subDays,
  format,
  parseISO,
} from "date-fns";
import { ChartRecord } from "@/types/chart-data";
import Image from "next/image";
import { FC, useMemo, useState } from "react";
import PenImage from "./../../assets/icons/pen-icon.svg";
import { LogData } from "@/types/log-data";
import { record } from "zod";

interface ProfileCardProps {
  profile: UserInfo;
  createdDates: Date[];
  learnedDates: LogData[];
}

const today = new Date();

const generateEmptyDates = () => {
  const dates: ChartRecord[] = [];
  for (let i = 365; i >= 0; i--) {
    dates.push({ name: format(subDays(today, i), "dd MMMM yyyy"), value: 0});
  }
  return dates;
};

const datesChartFormat = (data: Date[], emptyDates: ChartRecord[]) => {
   data.forEach((date) =>{
      date = new Date(date);
      const dateInEmptyDates = emptyDates.find(ele => ele.name == format(date, "dd MMMM yyyy"));
      if(dateInEmptyDates) dateInEmptyDates.value+=1;
      else emptyDates.push({name: format(date, "dd MMMM yyyy"), value: 1});
   });
   return emptyDates;
};

const reduceData = (data: ChartRecord[]) => {
   const recordsLength = data.length;
   let formattingOption = "do";
   if(recordsLength >= 28 && recordsLength < 90) formattingOption = "do";
   else if(recordsLength >= 90) formattingOption = "LLLL";
   data.forEach((record) => {
      record.name = format(new Date(record.name), formattingOption);
   });
   return data;
 };
 
const ProfileCard: FC<ProfileCardProps> = ({ profile, createdDates, learnedDates }) => {
  const emptyDates = generateEmptyDates();

  const createdFlashcards = useMemo(() => {
    return datesChartFormat(createdDates, emptyDates.slice())
  }, [emptyDates, createdDates]);

  const learnedFlashcards = useMemo(() => {
    return datesChartFormat(
      learnedDates.filter(log => log.wasCorrect).map((log) => log.date),
      emptyDates.slice()
    )
  }, [emptyDates, learnedDates]);

  const firstCreatedDate = format(new Date(createdFlashcards.find(stat =>{
    return stat.value !== 0;
   })?.name || createdFlashcards[0].name), "dd MMMM yyyy");
  const firstLearnedDate = format(new Date(learnedFlashcards.find(stat => stat.value !== 0)?.name || learnedFlashcards[0].name), "dd MMMM yyyy");


  const [createdStartDate, setCreatedStartDate] = useState(new Date(firstCreatedDate));
  const [learnedStartDate, setLearnedStartDate] = useState(new Date(firstLearnedDate));

  const selectedCreatedFlashcards = useMemo(() => {
    return reduceData(createdFlashcards.slice().filter((record) =>
      new Date(record.name) >= createdStartDate )
    );
  }, [createdStartDate, createdFlashcards]);

  const selectedLearnedFlashcards = useMemo(() => {
    return reduceData(learnedFlashcards.slice().filter((record) =>
      new Date(record.name) >= learnedStartDate )
    );
  }, [learnedStartDate, learnedFlashcards]);

  console.log(selectedCreatedFlashcards)

  const [isAvatarModalVisible, setAvatarModalVisibility] = useState(false);

   return (
      <div className="flex flex-col items-center rounded-xl bg-text text-background">
         <ChangeAvatar
            profile={profile}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
         />

         {profile.firstName && (
            <h2 className="mt-2 text-3xl font-bold">
               {profile.firstName} {profile?.lastName}
            </h2>
         )}
         <button
            className="relative inline-block"
            onClick={() => setIsOpen(true)}
         >
            {profile.avatar === null ? (
               <div className="grid h-16 w-16 place-items-center rounded-full border border-background text-4xl font-bold text-background">
                  {generateAbbreviation(profile)}
               </div>
            ) : (
               <Image
                  width={64}
                  height={64}
                  src={`/images/avatars/avatar_${profile.avatar}.png`}
                  alt={`Avatar of ${profile.username}`}
                  className="mt-2"
               />
            )}
            <Image
               width={15}
               height={15}
               className="absolute right-[-3px] top-[10px]"
               alt="Change avatar pen icon"
               src={PenImage}
            />
         </button>

         <p
            className={classNames(
               profile.firstName ? "text-gray-600" : "mt-2 text-3xl font-bold",
            )}
         >
            {profile.firstName && "@"}
            {profile.username}
         </p>
         <p>
            Member since:{" "}
            {format(parseISO(profile.dateRegistered), "dd MMMM yyyy")}
         </p>
         <p className=" text-3xl font-bold">Your stats: </p>
         <p className="text-lg">Created flashcards: </p>
         <ChartDateFilters
            changeStartDate={setCreatedStartDate}
            registerDate={parseISO(profile.dateRegistered)}
         />
         <LineChart
            data={selectedCreatedFlashcards}
            id="Flashcard stats chart"
         />
         <p className="text-lg">Learned flashcards: </p>
         <ChartDateFilters
            changeStartDate={setLearnedStartDate}
            registerDate={parseISO(profile.dateRegistered)}
         />
         <LineChart
            data={selectedLearnedFlashcards}
            id="Lessons stats chart"
         />
      </div>
   );
};

export default ProfileCard;
