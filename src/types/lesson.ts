import type { Flashcard } from "./flashcard";
import type { UserInfo } from "./user-info";

export interface Lesson {
   lessonId: number;
   owner: UserInfo;
   isPublic?: boolean;
   imageName: string | null;
   title: string;
   description?: string;
   dateCreated: string;
   flashcards: Array<Flashcard>;
   tags?: Array<string>;
   flashcardCount: number;
}
