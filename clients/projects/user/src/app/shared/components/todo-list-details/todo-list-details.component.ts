import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ResponseMessage } from '@sn/user/core/models';
import { showHide } from '@sn/user/shared/animations';
import { Todo, TodoList } from '@sn/user/shared/models';
import { idGenerator } from '@sn/user/shared/utils/id-generator.util';

@Component({
  selector: 'sn-todo-list-details',
  templateUrl: './todo-list-details.component.html',
  styleUrls: ['./todo-list-details.component.scss'],
  animations: [showHide]
})
export class TodoListDetailsComponent implements OnInit, AfterViewInit {
  @Input()
  public todoList: TodoList;

  @Input()
  public responseMessage: ResponseMessage;

  public form: FormGroup;

  constructor(
    private _controlContainer: ControlContainer
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
      isComplete: new FormControl(todo?.isComplete || false)
    });
  }
}
