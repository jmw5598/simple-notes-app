import { Flashcard } from "./flashcard.model";

export class FlashcardSet {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public title: string;
  public synopsis: string;
  public flashcards: Flashcard[];
}