"use client";

import { UserInfo } from "@/types/user-info";
import { FC, useMemo, useState } from "react";
import CustomLineChart from "@/components/chart/line-chart";
import ChartDateFilers from "@/components/chart/chart-date-filters";
import {
   subDays,
   addDays,
   isBefore,
   isEqual,
   format,
   parseISO,
} from "date-fns";
import { ChartData } from "@/types/chart-data";
import Image from "next/image";
import classNames from "classnames";
import ChangeAvatar from "./change-avatar";
import PenImage from "./../../assets/icons/pen-icon.svg";

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
   const [showAvatarChangeModal, setShowAvatarChangeModal] = useState(false);

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
         <h2 className="mt-2 text-3xl font-bold">Profile card</h2>
         {showAvatarChangeModal && (
            <ChangeAvatar
               profile={profile}
               closeModalFunction={() => setShowAvatarChangeModal(false)}
            />
         )}
         {profile.firstName && (
            <h2 className="mt-2 text-3xl font-bold">
               {profile.firstName} {profile?.lastName}
            </h2>
         )}
         <button
            className="relative inline-block"
            onClick={() => setShowAvatarChangeModal(true)}
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
         <ChartDateFilers
            changeStartDate={setFlashcardCreatedStartDate}
            registerDate={parseISO(profile.dateRegistered)}
         />
         <CustomLineChart
            data={flashcardCreatedStatsData}
            id="Flashcard stats chart"
         />
         <p className="text-lg">Learned flashcards: </p>
         <ChartDateFilers
            changeStartDate={setFlashcardLearnedStartDate}
            registerDate={parseISO(profile.dateRegistered)}
         />
         <CustomLineChart
            data={flashcardLearnedStatsData}
            id="Lessons stats chart"
         />
      </div>
   );
};

export default ProfileCard;
