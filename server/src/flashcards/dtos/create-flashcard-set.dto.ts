import { IsNotEmpty } from "class-validator";
import { CreateFlashcardDto } from "./create-flashcard.dto";

export class CreateFlashcardSetDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public synopsis: string;

  @IsNotEmpty()
  public flashcards: CreateFlashcardDto[]
}