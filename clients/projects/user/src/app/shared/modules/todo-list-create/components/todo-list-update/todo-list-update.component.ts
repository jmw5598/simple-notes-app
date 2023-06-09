import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ResponseMessage } from '@sn/shared/models';

import { Todo, TodoList } from '@sn/shared/models';
import { showHide } from '@sn/shared/animations';
import { idGenerator } from '@sn/user/shared/utils/id-generator.util';
import { toDateTimePickerFormat } from '@sn/user/shared/utils';

@Component({
  selector: 'sn-user-todo-list-update',
  templateUrl: './todo-list-update.component.html',
  styleUrls: ['./todo-list-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHide]
})
export class SnTodoListUpdateComponent implements OnInit, AfterViewInit {
  @Input()
  public todoList: TodoList;

  @Input()
  public responseMessage: ResponseMessage;

  public form: UntypedFormGroup;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _controlContainer: ControlContainer,
  ) { }

  ngOnInit(): void {
    this.form = this._controlContainer.control as UntypedFormGroup;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.form && this.todoList) {
        const todosFormArray: UntypedFormArray = this.form.get('todos') as UntypedFormArray;
        const formValue: {[key: string]: any} = {
          ...this.todoList,
          startedBy: toDateTimePickerFormat(new Date(this.todoList.startedBy)), 
          completedBy: toDateTimePickerFormat(new Date(this.todoList.completedBy)),
        }
        this.form.patchValue(formValue);
        todosFormArray.clear();
        this.todoList.todos.forEach((todo: Todo) => {
          todosFormArray.push(this._generateTodo(todo));
        });
        this._changeDetectorRef.markForCheck();
      }
    })
  }

  private _generateTodo(todo: Todo): UntypedFormGroup {
    return new UntypedFormGroup({
      id: new UntypedFormControl(todo?.id || idGenerator.next().value),
      description: new UntypedFormControl(todo.description),
      isComplete:  new UntypedFormControl(todo?.isComplete || false)
    });
  }
}
