import { Todo } from './todo.model';

export class TodoList {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  startedBy: Date;
  completedBy: Date;
  title: string;
  todos: Todo[];
}
