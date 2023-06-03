import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoList } from '@sn/shared/models';

@Component({
  selector: 'sn-user-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  @Input()
  public todoLists: TodoList[];

  @Output()
  public onCreate: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onView: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onEdit: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onDelete: EventEmitter<any> = new EventEmitter<any>();

  public create(): void {
    this.onCreate.emit();
  }

  public view(todoList: TodoList): void {
    this.onView.emit(todoList);
  }

  public edit(todoList: TodoList): void {
    this.onEdit.emit(todoList);
  }

  public delete(todoListId: number): void {
    this.onDelete.emit(todoListId);
  }
}
