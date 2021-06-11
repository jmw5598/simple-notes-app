import { Todo } from './todo.model';

export class TodoList {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  startedBy: Date;
  completedBy: Date;
  completedAt: Date;
  title: string;
  todos: Todo[];
}
