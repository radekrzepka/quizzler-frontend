import { UserInfo } from "../types/user-info";

export const generateAbbreviation = (profileDate: UserInfo) => {
   if (profileDate.firstName && profileDate.lastName)
      return `${profileDate.firstName[0]}${profileDate.lastName[0]}`;
   if (
      profileDate.firstName &&
      !profileDate.lastName &&
      profileDate.firstName.length >= 2
   )
      return `${profileDate.firstName[0]}${profileDate.firstName[1]}`;
   return `${profileDate.username[0]}${profileDate.username[1]}`;
};
