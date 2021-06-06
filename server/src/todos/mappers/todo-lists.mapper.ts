import { TodoListDto } from "../dtos/todo-list.dto";
import { TodoList } from "../entities/todo-list.entity";
import { TodosMapper } from "./todos.mapper";

export class TodoListsMapper {
  public static toTodoListDto(todoList: TodoList): TodoListDto {
    return {
      id: todoList.id,
      createdAt: todoList.createdAt,
      updatedAt: todoList.updatedAt,
      startedBy: todoList.startedBy,
      completedBy: todoList.completedBy,
      completedAt: todoList.completedAt,
      title: todoList.title,
      todos: TodosMapper.toTodoDtoList(todoList.todos) || []
    } as TodoListDto;
  }

  public static toTodoListDtoList(todoLists: TodoList[]): TodoListDto[] {
    return todoLists.map(todoList => TodoListsMapper.toTodoListDto(todoList));
  }
}
