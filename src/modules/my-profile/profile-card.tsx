"use client";

import ChartDateFilers from "@/components/chart/chart-date-filters";
import LineChart from "@/components/chart/line-chart";
import { ChartData } from "@/types/chart-data";
import { UserInfo } from "@/types/user-info";
import { generateAbbreviation } from "@/utils/generate-abbreviation";
import classNames from "classnames";
import {
   addDays,
   format,
   isBefore,
   isEqual,
   parseISO,
   subDays,
} from "date-fns";
import Image from "next/image";
import { FC, useMemo, useState } from "react";
import PenImage from "./../../assets/icons/pen-icon.svg";
import ChangeAvatar from "./change-avatar";

interface ProfileCardProps {
   profile: UserInfo;
}

const generateDateRange = (startDate: Date, endDate: Date): Date[] => {
   let currentDate = startDate;
   const dateArray: Date[] = [];

   while (isBefore(currentDate, endDate) || isEqual(currentDate, endDate)) {
      dateArray.push(currentDate);
      currentDate = addDays(currentDate, 1);
   }

   return dateArray;
};

// TODO: Convert to real api data
const generateRandomData = (dataRange: Date[]) => {
   const data: ChartData = [];
   for (const date of dataRange) {
      data.push({
         name: format(date, "dd MMMM yyyy"),
         value: Math.floor(Math.random() * 10),
      });
   }

   return data;
};

const today = new Date();

const ProfileCard: FC<ProfileCardProps> = ({ profile }) => {
   const [flashcardCreatedStartDate, setFlashcardCreatedStartDate] =
      useState<Date>(subDays(today, 30));
   const [flashcardLearnedStartDate, setFlashcardLearnedStartDate] =
      useState<Date>(subDays(today, 30));
   const [isOpen, setIsOpen] = useState(false);

   const flashcardCreatedStatsData = useMemo(() => {
      return generateRandomData(
         generateDateRange(flashcardCreatedStartDate, today),
      );
   }, [flashcardCreatedStartDate]);

   const flashcardLearnedStatsData = useMemo(() => {
      return generateRandomData(
         generateDateRange(flashcardLearnedStartDate, today),
      );
   }, [flashcardLearnedStartDate]);

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
         <ChartDateFilers
            changeStartDate={setFlashcardCreatedStartDate}
            registerDate={parseISO(profile.dateRegistered)}
         />
         <LineChart
            data={flashcardCreatedStatsData}
            id="Flashcard stats chart"
         />
         <p className="text-lg">Learned flashcards: </p>
         <ChartDateFilers
            changeStartDate={setFlashcardLearnedStartDate}
            registerDate={parseISO(profile.dateRegistered)}
         />
         <LineChart data={flashcardLearnedStatsData} id="Lessons stats chart" />
      </div>
   );
};

export default ProfileCard;
