import { Flashcard } from "./flashcard";
import { UserInfo } from "./user-info";

export interface Lesson {
   lessonId: number;
   owner?: UserInfo;
   isPublic?: boolean;
   imagePath: string | null;
   title: string;
   description?: string;
   dateCreated: string;
   flashcards: Flashcard[];
   tags?: string[];
}
