export interface Flashcard {
   flashcardId: number;
   lessonId: number;
   dateCreated: Date;
   questionText?: string;
   questionImageName?: string;
   answerText?: string;
   answerImageName?: string;
}
