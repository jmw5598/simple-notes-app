import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ControlContainer, FormArray, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { idGenerator } from '@sn/user/shared/utils/id-generator.util';
import { ECalendarValue, IDatePickerConfig } from 'ng2-date-picker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_DATE_TIME_PICKER_CONFIG } from '@sn/user/shared/defaults';

@Component({
  selector: 'sn-user-todo-list-form',
  templateUrl: './todo-list-form.component.html',
  styleUrls: ['./todo-list-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnTodoListFormComponent implements OnInit, AfterViewInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  public form: UntypedFormGroup;

  public datepickerConfig: IDatePickerConfig = {
    ...DEFAULT_DATE_TIME_PICKER_CONFIG
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    private _parentControl: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as UntypedFormGroup;
    this.form.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(value => this._changeDetectorRef.markForCheck())
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setFocusToTitleInput();
    });
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
    this.form.reset();
    this.form.setControl('todos', new FormArray([]));
    this._changeDetectorRef.markForCheck();
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

  ngOnDestroy(): void {
      this._destroy$.next();
      this._destroy$.complete();
  }
}
