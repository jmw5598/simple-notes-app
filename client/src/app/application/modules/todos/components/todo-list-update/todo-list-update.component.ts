import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ResponseMessage } from '@sn/core/models';
import { DrawerService } from '@sn/shared/components';
import { buildTodoListFormGroup } from '@sn/shared/forms';
import { TodoListFormComponent } from '@sn/shared/forms/todo-list-form/todo-list-form.component';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { ITodosState } from '../../store/reducers';

import * as todoSelectors from '@sn/application/modules/todos/store/selectors';
import * as todoActions from '@sn/application/modules/todos/store/actions';
import { Todo, TodoList } from '@sn/shared/models';
import { idGenerator } from '@sn/shared/utils/id-generator.util';
import { showHide } from '@sn/shared/animations';

@Component({
  selector: 'sn-todo-list-update',
  templateUrl: './todo-list-update.component.html',
  styleUrls: ['./todo-list-update.component.scss'],
  animations: [showHide]
})
export class TodoListUpdateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();

  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  public selectedTodoList$: Observable<TodoList>;

  constructor(
    private _store: Store<ITodosState>,
    private _formBuilder: FormBuilder,
    private _drawerService: DrawerService,
  ) { }

  ngOnInit(): void {
    this._initializeTodoListForm();
    this._selectState();
    this._syncSelectedTodoListWithForm();
  }

  public hide(): void {
    this._drawerService.close()
  }
  
  public onSubmit(value: any): void {
    const todoList: TodoList = { 
      ...value,
      todos: value.todos.map(todo => ({
        ...todo,
        id: todo?.id < 0 ? null : todo.id
      }))
    } as TodoList;
    this._store.dispatch(todoActions.updateTodoList({
      todoListId: todoList.id,
      todoList: todoList
    }));
  }

  public onClose(): void {
    this._drawerService.close();
  }

  private _selectState(): void {
    this.selectedTodoList$ = this._store.select(todoSelectors.selectSelectedTodoList);
    this.responseMessage$ = this._store.select(todoSelectors.selectUpdateTodoListResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            setTimeout(() => this._store.dispatch(todoActions.setUpdateTodoListResponseMessage({ message: null })), 3000);
          }
        })
      );
  }

  private _initializeTodoListForm(): void {
    this.form = buildTodoListFormGroup(this._formBuilder);
  }

  private _syncSelectedTodoListWithForm(): void {
    this.selectedTodoList$
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((todoList: TodoList) => {
        if (todoList) {
          this._patchTodoListToForm(todoList)
        }
      });
  }

  private _patchTodoListToForm(todoList: TodoList): void {
    const startedBy: Date = new Date(todoList.startedBy);
    const completedBy: Date = new Date(todoList.completedBy);
    const todosFormArray: FormArray = this.form.get('todos') as FormArray;
    this.form.patchValue({
      ...todoList,
      startedBy: startedBy,
      completedBy: completedBy
    });
    todoList.todos.forEach((todo: Todo) => {
      todosFormArray.push(this._generateTodo(todo));
    })
  }

  private _generateTodo(todo: Todo): FormGroup {
    return new FormGroup({
      id: new FormControl(todo?.id || idGenerator.next().value),
      description: new FormControl(todo.description)
    });
  }

  private _generateDateTimeValue(date: Date, time: Date): Date {
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(time.getSeconds());
    return date;
  }

  ngOnDestroy(): void {
    this._store.dispatch(todoActions.setSelectedTodoList({ todoList: null }));
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
