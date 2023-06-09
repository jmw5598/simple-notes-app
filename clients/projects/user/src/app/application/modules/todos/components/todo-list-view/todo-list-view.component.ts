import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ResponseMessage } from '@sn/shared/models';
import { buildTodoListFormGroup } from '@sn/user/shared/modules/todo-list-create';
import { TodoList } from '@sn/shared/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITodosState } from '../../store/reducers';

import * as todosSelectors from '../../store/selectors';
import * as todosActions from '../../store/actions';

import { SnDrawerService } from '@sn/drawer';

@Component({
  selector: 'sn-user-todo-list-view',
  templateUrl: './todo-list-view.component.html',
  styleUrls: ['./todo-list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListViewComponent implements OnInit {
  public form: UntypedFormGroup;
  public data$: Observable<TodoList>;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _drawerService: SnDrawerService,
    private _store: Store<ITodosState>
  ) { }

  ngOnInit(): void {
    this.form = buildTodoListFormGroup(this._formBuilder);
    this.data$ = this._drawerService.onDataChange();

    this.responseMessage$ = this._store.select(todosSelectors.selectUpdateTodoListResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            setTimeout(() => this._store.dispatch(
              todosActions.setUpdateTodoListResponseMessage({ message: null })), 3000);
          }
        })
      );
  }

  public onSave(formValue: any): void {
    formValue?.todos?.forEach(todo => todo.id = todo?.id < 0 ? null : todo.id);
    const todoList: TodoList = { ...formValue } as TodoList;
    this._store.dispatch(todosActions.updateTodoList({ 
      todoListId: todoList.id, todoList: todoList 
    }));
  }

  public onCancel(): void {
    this._drawerService.close();
  }
}
