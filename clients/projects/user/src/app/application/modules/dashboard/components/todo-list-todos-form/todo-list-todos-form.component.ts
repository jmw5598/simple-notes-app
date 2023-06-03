import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { slideUpDownAnimation } from '@sn/shared/animations';
import { Todo, TodoList } from '@sn/shared/models';

@Component({
  selector: 'sn-user-todo-list-todos-form',
  templateUrl: './todo-list-todos-form.component.html',
  styleUrls: ['./todo-list-todos-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideUpDownAnimation]
})
export class TodoListTodosFormComponent {
  @Input()
  public todoList: TodoList;

  @Input()
  public isTodoListVisible: boolean = false;

  @Output()
  public onUpdate: EventEmitter<TodoList> = new EventEmitter<TodoList>();

  public onUpdateTodos(todos: Todo[]): void {
    this.todoList = { ...this.todoList, todos: todos } ;
    this.onUpdate.emit({ ...this.todoList });
  }
}
