import { IsNotEmpty } from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty()
  public description: string;
}
