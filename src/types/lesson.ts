import { UserInfo } from "./user-info";
import { Flashcard } from "./flashcard";

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
