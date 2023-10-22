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
import classNames from "classnames";
import ChangeAvatar from "./change-avatar";
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
  for (let i = 334; i >= 0; i--) {
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
   const result: ChartRecord[] = [];
   const recordsLength = data.length;
   // Determine formatting option based on the length of records.
   let formattingOption = recordsLength >= 90 ? "LLLL" : recordsLength >= 28 ? "PP" : "do";

   if(formattingOption !== "PP"){
      data.forEach((record) => {
         const dateInResult = result.find(item => item.name === format(new Date(record.name), formattingOption));
         if(dateInResult) dateInResult.value += record.value;
         else result.push({name: format(new Date(record.name), formattingOption), value: 0});
      })
   }
   else {
      let sumForTheWeek = 0;
      data.forEach((record, index) =>{
         sumForTheWeek += record.value;
         const isLastRecord = index === data.length - 1;
         const isSunday = format(new Date(record.name), "EEEE") === "Sunday";

         if (isSunday || isLastRecord) {
           const date = new Date(record.name);
           const stringDates = `${format(subDays(date, 6), "d")} ${format(subDays(date, 6), "MMM")} - ${format(date, "d")} ${format(date, "MMM")}`;
           result.push({ name: stringDates, value: sumForTheWeek });
           sumForTheWeek = 0; // reset for the next week
         }
      })
   }
   return result;
 };
 
const ProfileCard: FC<ProfileCardProps> = ({ profile, createdDates, learnedDates }) => {
  const emptyDatesCreated = generateEmptyDates();
  const emptyDatesLearned = generateEmptyDates();

  const createdFlashcards = useMemo(() => {
    return datesChartFormat(createdDates, emptyDatesCreated.slice())
  }, [emptyDatesCreated, createdDates]);

  const learnedFlashcards = useMemo(() => {
    return datesChartFormat(
      learnedDates.filter(log => log.wasCorrect).map((log) => log.date),
      emptyDatesLearned.slice()
    )
  }, [emptyDatesLearned, learnedDates]);

  const firstCreatedDate = format(new Date(createdFlashcards.find(stat => stat.value !== 0)?.name || createdFlashcards[0].name), "dd MMMM yyyy");
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

  const [isAvatarModalVisible, setAvatarModalVisibility] = useState(false);

   return (
      <div className="flex flex-col items-center rounded-xl bg-text text-background">
         <h2 className="mt-2 text-3xl font-bold">Profile card</h2>
         {isAvatarModalVisible && (
            <ChangeAvatar
               profile={profile}
               closeModalFunction={() => setAvatarModalVisibility(false)}
            />
         )}
         {profile.firstName && (
            <h2 className="mt-2 text-3xl font-bold">
               {profile.firstName} {profile?.lastName}
            </h2>
         )}
         <button
            className="relative inline-block"
            onClick={() => setAvatarModalVisibility(true)}
         >
            <Image
               width={64}
               height={64}
               src={`/images/avatars/avatar_${profile.avatar}.png`}
               alt={`Avatar of ${profile.username}`}
               className="mt-2"
            />
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
         <p className="mt-5 text-3xl font-bold">Your stats: </p>
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
