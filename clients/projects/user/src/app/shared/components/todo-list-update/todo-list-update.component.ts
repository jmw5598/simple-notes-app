import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ResponseMessage } from '@sn/shared/models';

import { Todo, TodoList } from '@sn/shared/models';
import { showHide } from '@sn/shared/animations';
import { idGenerator } from '@sn/user/shared/utils/id-generator.util';

@Component({
  selector: 'sn-user-todo-list-update',
  templateUrl: './todo-list-update.component.html',
  styleUrls: ['./todo-list-update.component.scss'],
  animations: [showHide]
})
export class TodoListUpdateComponent implements OnInit, AfterViewInit {
  @Input()
  public todoList: TodoList;

  @Input()
  public responseMessage: ResponseMessage;

  public form: UntypedFormGroup;

  constructor(
    private _controlContainer: ControlContainer,
  ) { }

  ngOnInit(): void {
    this.form = this._controlContainer.control as UntypedFormGroup;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.form && this.todoList) {
        const todosFormArray: UntypedFormArray = this.form.get('todos') as UntypedFormArray;
        const startDateTime: Date = new Date(this.todoList.startedBy);
        const endDateTime: Date = new Date(this.todoList.completedBy);
        const formValue: {[key: string]: any} = {
          ...this.todoList,
          startedBy: startDateTime, 
          completedBy: endDateTime,
        }
        this.form.patchValue(formValue);
        todosFormArray.clear();
        this.todoList.todos.forEach((todo: Todo) => {
          todosFormArray.push(this._generateTodo(todo));
        })
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
