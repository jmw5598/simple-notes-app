import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ResponseMessage } from '@sn/core/models';

import { Todo, TodoList } from '@sn/shared/models';
import { showHide } from '@sn/shared/animations';
import { idGenerator } from '@sn/shared/utils/id-generator.util';

@Component({
  selector: 'sn-todo-list-update',
  templateUrl: './todo-list-update.component.html',
  styleUrls: ['./todo-list-update.component.scss'],
  animations: [showHide]
})
export class TodoListUpdateComponent implements OnInit {
  @Input()
  public todoList: TodoList;

  @Input()
  public responseMessage: ResponseMessage;

  public form: FormGroup;

  constructor(
    private _controlContainer: ControlContainer,
  ) { }

  ngOnInit(): void {
    this.form = this._controlContainer.control as FormGroup;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.form && this.todoList) {
        const todosFormArray: FormArray = this.form.get('todos') as FormArray;
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

  private _generateTodo(todo: Todo): FormGroup {
    return new FormGroup({
      id: new FormControl(todo?.id || idGenerator.next().value),
      description: new FormControl(todo.description),
      isComplete:  new FormControl(todo?.isComplete || false)
    });
  }
}
