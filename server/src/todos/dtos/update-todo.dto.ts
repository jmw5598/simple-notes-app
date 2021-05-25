import { IsNotEmpty } from "class-validator";

export class UpdateTodoDto {
  @IsNotEmpty()
  public id: number;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public isComplete: boolean;
}