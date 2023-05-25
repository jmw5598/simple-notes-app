import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ControlContainer, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { idGenerator } from '@sn/user/shared/utils/id-generator.util';

@Component({
  selector: 'sn-user-todo-list-form',
  templateUrl: './todo-list-form.component.html',
  styleUrls: ['./todo-list-form.component.scss']
})
export class TodoListFormComponent implements OnInit, AfterViewInit {
  public form: UntypedFormGroup;

  public datepickerConfig = { 
    adaptivePosition: true, 
    containerClass: 'theme-blue',
    isAnimated: true
  };

  constructor(
    private _renderer: Renderer2,
    private _parentControl: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as UntypedFormGroup;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setFocusToTitleInput();
    })
  }

  public addTodo(description: string): void {
    const todosArray: UntypedFormArray = this.form.get('todos') as UntypedFormArray;
    todosArray.push(this._createTodo(description));
    this.form.get('description').reset();
    this._renderer.selectRootElement('#description').focus();
  }

  public removeTodo(todoValue: any): void {
    const todosArray: UntypedFormArray = this.form.get('todos') as UntypedFormArray;
    const removeIndex: number = todosArray.controls.findIndex(control => control.value.id === todoValue.id);
    if (removeIndex !== -1) {
      todosArray.removeAt(removeIndex);
    }
  }

  public get todos(): UntypedFormArray {
    return this.form.get('todos') as UntypedFormArray;
  }

  private _createTodo(description: string): UntypedFormGroup {
    return new UntypedFormGroup({
      id: new UntypedFormControl(-idGenerator.next().value),
      description: new UntypedFormControl(description)
    })
  }

  public reset(): void {
    // TODO reset form
  }

  private _setFocusToTitleInput(): void {
    this._renderer.selectRootElement('#title').focus();
  }

  public dropTodo(event: CdkDragDrop<any>): void {
    const todosArrays: UntypedFormArray = this.form.get('todos') as UntypedFormArray;
    const dir = event.currentIndex > event.previousIndex ? 1 : -1;
    const from = event.previousIndex;
    const to = event.currentIndex;
    const temp = todosArrays.at(from);
    for (let i = from; i * dir < to * dir; i = i + dir) {
      const current = todosArrays.at(i + dir);
      todosArrays.setControl(i, current);
    }
    todosArrays.setControl(to, temp);
  }  
}
