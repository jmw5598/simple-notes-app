import { IsNotEmpty } from "class-validator";
import { UpdateTodoDto } from "./update-todo.dto";

export class UpdateTodoListDto {
  @IsNotEmpty()
  public id: number;

  @IsNotEmpty()
  public startedBy: Date;

  @IsNotEmpty()
  public completedBy: Date;

  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public todos: UpdateTodoDto[];
}