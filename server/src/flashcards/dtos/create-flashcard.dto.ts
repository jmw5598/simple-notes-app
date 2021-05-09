import { IsNotEmpty } from "class-validator";

export class CreateFlashcardDto {
  @IsNotEmpty()
  public frontContent: string;

  @IsNotEmpty()
  public backContent: string;
}
