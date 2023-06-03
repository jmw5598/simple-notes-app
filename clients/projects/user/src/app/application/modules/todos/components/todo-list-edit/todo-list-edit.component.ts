import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ResponseMessage } from '@sn/shared/models';
import { buildTodoListFormGroup } from '@sn/user/shared/forms';
import { Todo, TodoList } from '@sn/shared/models';
import { Observable } from 'rxjs';
import { ITodosState } from '../../store/reducers';

import * as todosActions from '../../store/actions';
import * as todosSelectors from '../../store/selectors';
import { tap } from 'rxjs/operators';

import { DrawerService } from '@sn/shared/components';

@Component({
  selector: 'sn-user-todo-list-edit',
  templateUrl: './todo-list-edit.component.html',
  styleUrls: ['./todo-list-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListEditComponent implements OnInit {
  public responseMessage$: Observable<ResponseMessage>;
  public data$: Observable<TodoList>;

  public form: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _drawerService: DrawerService,
    private _store: Store<ITodosState>
  ) { }

  ngOnInit(): void {
    this.form = buildTodoListFormGroup(this._formBuilder);
    this.data$ = this._drawerService.onDataChange();
    this.responseMessage$ = this._store.select(todosSelectors.selectUpdateTodoListResponseMessage)
      .pipe(tap(message => {
        setTimeout(() => this._store.dispatch(todosActions.setUpdateTodoListResponseMessage({ message: null })), 3000)
      }));
  }

  public onUpdate(formValue: any): void {
    const todoList: TodoList = { 
      ...formValue,
      todos: formValue.todos.map((todo: Todo) => ({
        ...todo,
        id: todo?.id < 0 ? null : todo?.id
      }))
     } as TodoList;
    this._store.dispatch(todosActions.updateTodoList({ 
      todoListId: todoList.id, todoList: todoList 
    }));
  }

  public onCancel(): void {
    this._drawerService.close();
  }
}
