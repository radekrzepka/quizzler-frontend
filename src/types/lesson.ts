import { UserInfo } from "./user-info";

export interface Lesson {
   lessonId: number;
   lessonOwner: UserInfo;
   isPublic: boolean;
   title: string;
   description?: string;
   dateCreated: string;
}
