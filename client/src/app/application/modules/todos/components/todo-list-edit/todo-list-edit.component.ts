import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ResponseMessage } from '@sn/core/models';
import { DrawerService } from '@sn/shared/components';
import { buildTodoListFormGroup } from '@sn/shared/forms';
import { Todo, TodoList } from '@sn/shared/models';
import { Observable } from 'rxjs';
import { ITodosState } from '../../store/reducers';

import * as todosActions from '../../store/actions';
import * as todosSelectors from '../../store/selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'sn-todo-list-edit',
  templateUrl: './todo-list-edit.component.html',
  styleUrls: ['./todo-list-edit.component.scss']
})
export class TodoListEditComponent implements OnInit {
  public responseMessage$: Observable<ResponseMessage>;
  public data$: Observable<TodoList>;

  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
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
    console.log("form value is ", formValue);
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
