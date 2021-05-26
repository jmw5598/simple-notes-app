import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { slideUpDownAnimation } from '@sn/shared/animations';
import { Todo, TodoList } from '@sn/shared/models';

@Component({
  selector: 'sn-todo-list-todos-form',
  templateUrl: './todo-list-todos-form.component.html',
  styleUrls: ['./todo-list-todos-form.component.scss'],
  animations: [slideUpDownAnimation]
})
export class TodoListTodosFormComponent implements OnInit {
  @Input()
  public todoList: TodoList;

  @Input()
  public isTodoListVisible: boolean = false;

  @Output()
  public onUpdate: EventEmitter<TodoList> = new EventEmitter<TodoList>();

  constructor() { }

  ngOnInit(): void {
  }

  public onUpdateTodos(todos: Todo[]): void {
    this.onUpdate.emit({
      ...this.todoList, todos: todos
    });
  }
}
