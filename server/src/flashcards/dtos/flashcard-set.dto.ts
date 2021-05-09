import { Flashcard } from "../entities/flashcard.entity";

export class FlashcardSetDto {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public title: string;
  public synopsis: string;
  public flashcards: Flashcard[];
}
