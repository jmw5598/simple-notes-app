import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ITodosState } from '@sn/application/modules/todos/store/reducers';
import { ResponseMessage } from '@sn/core/models';
import { TodoListFormComponent } from '@sn/shared/forms/todo-list-form/todo-list-form.component';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { DrawerService } from '../drawer/drawer.service';

import * as todoSelectors from '@sn/application/modules/todos/store/selectors';
import * as todoActions from '@sn/application/modules/todos/store/actions';
import { buildTodoListFormGroup } from '@sn/shared/forms';
import { TodoList } from '@sn/shared/models';
import { showHide } from '@sn/shared/animations';


@Component({
  selector: 'sn-todo-list-create',
  templateUrl: './todo-list-create.component.html',
  styleUrls: ['./todo-list-create.component.scss'],
  animations: [showHide]
})
export class TodoListCreateComponent implements OnInit, AfterViewInit {
  @ViewChild(TodoListFormComponent, { static: true })
  public todoListForm: TodoListFormComponent;

  public form: FormGroup;
  public data$: Observable<any>;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _store: Store<ITodosState>,
    private _formBuilder: FormBuilder,
    private _drawerService: DrawerService,
  ) { }

  ngOnInit(): void {
    this.data$ = this._drawerService.onDataChange();
    this.responseMessage$ = this._store.select(todoSelectors.selectCreateTodoListResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.todoListForm.reset();
            setTimeout(() => this._store.dispatch(todoActions.setCreateTodoListResponseMessage({ message: null })), 3000);
          }
        })
      );
    this.form = buildTodoListFormGroup(this._formBuilder);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.data$.pipe(take(1))
        .subscribe(data => {
          // TODO - Do I need this??
          // if (data && data.date) {
          //   const selectedDate: Date = new Date(data.date);
          //   this.form.get('startDate').patchValue(selectedDate);
          //   this.form.get('endDate').patchValue(selectedDate);
          // }
        })
    })
  }

  public hide(): void {
    this._drawerService.close()
  }
  
  public onSubmit(value: any): void {
    const todoList: TodoList = { id: null, ...value } as TodoList;
    this._store.dispatch(todoActions.createTodoList({
      todoList: todoList
    }));
  }

  public onClose(): void {
    this._drawerService.close();
  }

  private _generateDateTimeValue(date: Date, time: Date): Date {
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(time.getSeconds());
    return date;
  }
}
