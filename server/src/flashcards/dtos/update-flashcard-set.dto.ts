import { IsNotEmpty } from "class-validator";
import { CreateFlashcardDto } from "./create-flashcard.dto";

export class UpdateFlashcardSetDto {
  @IsNotEmpty()
  public id: number;
  
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public synopsis: string;

  @IsNotEmpty()
  public flashcards: CreateFlashcardDto[]
}
