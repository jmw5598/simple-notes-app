import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ResponseMessage } from '@sn/user/core/models';
import { DrawerService } from '@sn/user/shared/components';
import { buildTodoListFormGroup } from '@sn/user/shared/forms';
import { TodoList } from '@sn/user/shared/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITodosState } from '../../store/reducers';

import * as todosSelectors from '../../store/selectors';
import * as todosActions from '../../store/actions';

@Component({
  selector: 'sn-todo-list-view',
  templateUrl: './todo-list-view.component.html',
  styleUrls: ['./todo-list-view.component.scss']
})
export class TodoListViewComponent implements OnInit {
  public form: FormGroup;
  public data$: Observable<TodoList>;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: FormBuilder,
    private _drawerService: DrawerService,
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
