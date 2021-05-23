import { TodoDto } from "../dtos/todo.dto";
import { Todo } from "../entities/todo.entity";

export class TodosMapper {
  public static toTodoDto(todo: Todo): TodoDto {
    return {
      id: todo.id,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
      startedBy: todo.startedBy,
      completedBy: todo.completedBy,
      description: todo.description,
      isComplete: todo.isComplete
    } as TodoDto;
  }

  public static toTodoDtoList(todos: Todo[]): TodoDto[] {
    return todos.map(todo => TodosMapper.toTodoDto(todo)) || [];
  }
}
