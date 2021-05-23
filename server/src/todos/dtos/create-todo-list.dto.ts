import { IsNotEmpty } from "class-validator";
import { CreateTodoDto } from "./create-todo.dto";

export class CreateTodoListDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public startedBy: Date;

  @IsNotEmpty()
  public completedBy: Date;

  @IsNotEmpty()
  public todos: CreateTodoDto[];
}
