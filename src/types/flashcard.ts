export interface Flashcard {
   flashcardId: number;
   lessonId: number;
   dateCreated: Date;
   questionText: string;
   questionImagePath?: string;
   answerText: string;
   answerImagePath?: string;
}
