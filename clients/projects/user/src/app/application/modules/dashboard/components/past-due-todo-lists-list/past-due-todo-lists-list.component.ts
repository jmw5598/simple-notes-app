import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoList } from '@sn/user/shared/models';
import { IDashboardState } from '../../store/reducers';

import * as dashboardActions from '../../store/actions';

@Component({
  selector: 'sn-past-due-todo-lists-list',
  templateUrl: './past-due-todo-lists-list.component.html',
  styleUrls: ['./past-due-todo-lists-list.component.scss']
})
export class PastDueTodoListsListComponent implements OnInit {
  @Input()
  public todoLists: TodoList[];

  constructor(
    private _store: Store<IDashboardState>
  ) { }

  ngOnInit(): void {
  }

  public onUpdateTodoList(todoList: TodoList): void {
    this._store.dispatch(dashboardActions.updatePastDueTodoList({
      todoListId: todoList.id, 
      todoList: todoList
    }));
  }
}
