import { IsNotEmpty } from "class-validator";

export class UpdateTodoDto {
  @IsNotEmpty()
  public id: number;

  @IsNotEmpty()
  public startedBy: Date;

  @IsNotEmpty()
  public completedBy: Date;

  @IsNotEmpty()
  public description: string;

  @IsNotEmpty()
  public isComplete: boolean;
}