import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoList } from '@sn/shared/models';
import { IDashboardState } from '../../store/reducers';

import * as dashboardActions from '../../store/actions';

@Component({
  selector: 'sn-todays-todo-lists-list',
  templateUrl: './todays-todo-lists-list.component.html',
  styleUrls: ['./todays-todo-lists-list.component.scss']
})
export class TodaysTodoListsListComponent implements OnInit {
  @Input()
  public todoLists: TodoList[];

  constructor(
    private _store: Store<IDashboardState>
  ) { }

  ngOnInit(): void {
  }

  public onUpdateTodoList(todoList: TodoList): void {
    this._store.dispatch(dashboardActions.updateTodaysTodoList({
      todoListId: todoList.id, 
      todoList: todoList
    }));
  }
}
