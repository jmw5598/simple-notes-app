import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ControlContainer, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from '@sn/user/shared/models';
import { idGenerator } from '@sn/user/shared/utils/id-generator.util';

@Component({
  selector: 'sn-user-todo-list-form',
  templateUrl: './todo-list-form.component.html',
  styleUrls: ['./todo-list-form.component.scss']
})
export class TodoListFormComponent implements OnInit, AfterViewInit {
  public form: FormGroup;

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
    this.form = this._parentControl.control as FormGroup;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setFocusToTitleInput();
    })
  }

  public addTodo(description: string): void {
    const todosArray: FormArray = this.form.get('todos') as FormArray;
    todosArray.push(this._createTodo(description));
    this.form.get('description').reset();
    this._renderer.selectRootElement('#description').focus();
  }

  public removeTodo(todoValue: any): void {
    const todosArray: FormArray = this.form.get('todos') as FormArray;
    const removeIndex: number = todosArray.controls.findIndex(control => control.value.id === todoValue.id);
    if (removeIndex !== -1) {
      todosArray.removeAt(removeIndex);
    }
  }

  public get todos(): FormArray {
    return this.form.get('todos') as FormArray;
  }

  private _createTodo(description: string): FormGroup {
    return new FormGroup({
      id: new FormControl(-idGenerator.next().value),
      description: new FormControl(description)
    })
  }

  public reset(): void {
    // TODO reset form
  }

  private _setFocusToTitleInput(): void {
    this._renderer.selectRootElement('#title').focus();
  }

  public dropTodo(event: CdkDragDrop<any>): void {
    const todosArrays: FormArray = this.form.get('todos') as FormArray;
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
