import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoList } from '@sn/shared/models';
import { IDashboardState } from '../../store/reducers';

import * as dashboardActions from '../../store/actions';

@Component({
  selector: 'sn-user-todays-todo-lists-list',
  templateUrl: './todays-todo-lists-list.component.html',
  styleUrls: ['./todays-todo-lists-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodaysTodoListsListComponent {
  @Input()
  public todoLists: TodoList[];

  constructor(
    private _store: Store<IDashboardState>
  ) { }

  public onUpdateTodoList(todoList: TodoList): void {
    this._store.dispatch(dashboardActions.updateTodaysTodoList({
      todoListId: todoList.id, 
      todoList: todoList
    }));
  }
}
