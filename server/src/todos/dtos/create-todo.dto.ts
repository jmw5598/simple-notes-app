import { IsNotEmpty } from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty()
  public startedBy: Date;

  @IsNotEmpty()
  public completedBy: Date;

  @IsNotEmpty()
  public description: string;
}
