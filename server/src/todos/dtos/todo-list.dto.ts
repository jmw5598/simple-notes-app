import { TodoDto } from "./todo.dto";

export class TodoListDto {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public startedBy: Date;
  public completedBy: Date;
  public completedAt: Date;
  public title: string;
  public todos: TodoDto[];
}
