"use client";

import { UserInfo } from "@/types/user-info";
import LineChart from "@/components/chart/line-chart";
import ChartDateFilters from "@/components/chart/chart-date-filters";
import {
   subDays,
   format,
   parseISO,
   subMonths,
   isEqual,
   addDays,
   compareAsc,
} from "date-fns";
import { ChartRecord } from "@/types/chart-data";
import Image from "next/image";
import { FC, useMemo, useState } from "react";
import { LogData } from "@/types/log-data";
import classNames from "classnames";
import { generateAbbreviation } from "@/utils/generate-abbreviation";
import ChangeAvatar from "./change-avatar";

interface ProfileCardProps {
   profile: UserInfo;
   createdDates: Date[];
   learnedDates: LogData[];
}

const DAY_VIEW_NUMBER = 28;
const MONTH_VIEW_NUMBER = 90;

const generateEmptyDates = () => {
   const today = new Date();
   const dates: ChartRecord[] = [];
   const startDate = subMonths(today, 11);
   let procDate = startDate;
   while (!isEqual(procDate, today)) {
      dates.push({
         name: format(procDate, "dd MMMM yyyy"),
         value: 0,
      });
      procDate = addDays(procDate, 1);
   }
   return dates;
};

const datesChartFormat = (data: Date[], emptyDates: ChartRecord[]) => {
   data.forEach((date) => {
      date = new Date(date + "Z");
      const dateInEmptyDates = emptyDates.find(
         (ele) => ele.name == format(date, "dd MMMM yyyy"),
      );
      if (dateInEmptyDates) dateInEmptyDates.value += 1;
      else emptyDates.push({ name: format(date, "dd MMMM yyyy"), value: 1 });
   });
   return emptyDates;
};

const reduceData = (data: ChartRecord[]) => {
   const result: ChartRecord[] = [];
   const recordsLength = data.length;
   // Determine formatting option based on the length of records.
   let formattingOption =
      recordsLength >= MONTH_VIEW_NUMBER
         ? "LLLL yyyy"
         : recordsLength >= DAY_VIEW_NUMBER
         ? "PP"
         : "do MMM";

   if (formattingOption !== "PP") {
      data.forEach((record) => {
         const processDate = new Date(record.name);
         const dateInResult = result.find(
            (item) => item.name === format(processDate, formattingOption),
         );
         if (dateInResult) dateInResult.value += record.value;
         else
            result.push({
               name: format(processDate, formattingOption),
               value: record.value,
            });
      });
   } else {
      let sumForTheWeek = 0;
      let lastDate = new Date();
      data.forEach((record, index) => {
         sumForTheWeek += record.value;
         const isLastRecord = index === data.length - 1;
         const isSunday = format(new Date(record.name), "EEEE") === "Sunday";
         if (isSunday) {
            const date = new Date(record.name);
            const stringDates = `${format(subDays(date, 6), "d")} ${format(
               subDays(date, 6),
               "MMM",
            )} - ${format(date, "d")} ${format(date, "MMM")} ${format(
               date,
               "yyyy",
            )}`;
            result.push({ name: stringDates, value: sumForTheWeek });
            lastDate = date;
            sumForTheWeek = 0; // reset for the next week
         } else if (isLastRecord) {
            const date = addDays(lastDate, 7);
            const stringDates = `${format(subDays(date, 6), "d")} ${format(
               subDays(date, 6),
               "MMM",
            )} - ${format(date, "d")} ${format(date, "MMM")} ${format(
               date,
               "yyyy",
            )}`;
            result.push({ name: stringDates, value: sumForTheWeek });
         }
      });
   }
   return result;
};

const ProfileCard: FC<ProfileCardProps> = ({
   profile,
   createdDates,
   learnedDates,
}) => {
   const emptyDatesCreated = generateEmptyDates();
   const emptyDatesLearned = generateEmptyDates();

   const createdFlashcards = useMemo(() => {
      return datesChartFormat(createdDates, emptyDatesCreated);
   }, [emptyDatesCreated, createdDates]);

   const learnedFlashcards = useMemo(() => {
      return datesChartFormat(
         learnedDates.filter((log) => log.wasCorrect).map((log) => log.date),
         emptyDatesLearned,
      );
   }, [emptyDatesLearned, learnedDates]);

   const [createdStartDate, setCreatedStartDate] = useState(
      new Date(parseISO(profile.dateRegistered)),
   );
   const [learnedStartDate, setLearnedStartDate] = useState(
      new Date(parseISO(profile.dateRegistered)),
   );
   const selectedCreatedFlashcards = useMemo(() => {
      return reduceData(
         createdFlashcards
            .slice()
            .filter(
               (record) =>
                  compareAsc(
                     new Date(record.name),
                     createdStartDate.setHours(0, 0, 0, 0),
                  ) >= 0,
            ),
      );
   }, [createdStartDate, createdFlashcards]);

   const selectedLearnedFlashcards = useMemo(() => {
      return reduceData(
         learnedFlashcards
            .slice()
            .filter(
               (record) =>
                  compareAsc(
                     new Date(record.name),
                     learnedStartDate.setHours(0, 0, 0, 0),
                  ) >= 0,
            ),
      );
   }, [learnedStartDate, learnedFlashcards]);

   const [isOpen, setIsOpen] = useState(false);
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
               <>
                  <div className="mt-2 grid h-16 w-16 place-items-center rounded-full bg-background text-4xl font-bold text-primary">
                     {generateAbbreviation(profile)}
                  </div>
                  <Image
                     width={15}
                     height={15}
                     className="absolute right-[-4px] top-[2px]"
                     alt="Change avatar pen icon"
                     src="/icons/pen-icon.svg"
                  />
               </>
            ) : (
               <>
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
                     className="absolute right-[-4px] top-[2px]"
                     alt="Change avatar pen icon"
                     src="/icons/pen-icon.svg"
                  />
               </>
            )}
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
            recordType="flashcards"
         />
         <p className="text-lg">Learned flashcards: </p>
         <ChartDateFilters
            changeStartDate={setLearnedStartDate}
            registerDate={parseISO(profile.dateRegistered)}
         />
         <LineChart
            data={selectedLearnedFlashcards}
            id="Lessons stats chart"
            recordType="flashcards"
         />
      </div>
   );
};

export default ProfileCard;
