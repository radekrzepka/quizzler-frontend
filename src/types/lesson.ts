import { UserInfo } from "./user-info";

export interface Lesson {
   lessonId: number;
   lessonOwner?: UserInfo;
   isPublic?: boolean;
   imagePath: string | null;
   title: string;
   description?: string;
   dateCreated: string;
}
