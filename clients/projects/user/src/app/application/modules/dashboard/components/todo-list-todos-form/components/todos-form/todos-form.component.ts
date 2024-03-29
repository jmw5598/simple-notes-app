import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Todo } from '@sn/shared/models';
import { Subject } from 'rxjs';
import { debounceTime, skip, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sn-user-todos-form',
  templateUrl: './todos-form.component.html',
  styleUrls: ['./todos-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosFormComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly FORM_DEBOUNCE_TIME: number = 500;
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  private _todosChangesSubject: Subject<Todo[]> = new Subject<Todo[]>();
  public form: UntypedFormGroup;

  private _todos: Todo[];

  @Input()
  public set todos(todos: Todo[]) {
    this._todos = todos;
    if (this.form && !this._todos) {
      this._patchTodosToForm(todos);
    }
  }

  public get todos(): Todo[] { 
    return this._todos; 
  }

  @Input()
  public isVisible: boolean = true;

  @Output()
  public onUpdate: EventEmitter<Todo[]> = new EventEmitter<Todo[]>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this._initializeTodosForm();
    this._listenForTodosFormChanges();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this._patchTodosToForm(this.todos));
  }

  public updateTodos(todos: Todo[]): void {
    this.onUpdate.emit(todos);
  }

  private _initializeTodosForm(): void {
    this.form = this._formBuilder.group({
      todos: this._formBuilder.array([], [Validators.required])
    })
  }

  private _listenForTodosFormChanges(): void {
    this._todosChangesSubject
      .pipe(
        skip(1),
        debounceTime(this.FORM_DEBOUNCE_TIME),
        takeUntil(this._subscriptionSubject),
      )
      .subscribe(todos => this.onUpdate.emit((todos || []) as Todo[]));
  }

  public onTodoCheckboxChange(event: any): void {
    this._todosChangesSubject.next(this.form.value.todos as Todo[] || []);
  }

  // TODO This fires update http requests on initial load of component FIX THIS
  private _patchTodosToForm(todos: Todo[]): void {
    if (this.form && todos?.length) {
      const todosFormArray: UntypedFormArray = this.form.get('todos') as UntypedFormArray;
      todosFormArray.patchValue(
        todos.map((todo: Todo) => this._createTodoFormGroup(todo)),
        { onlySelf: false, emitEvent: false }
      )
      todos.forEach(todo => todosFormArray.push(this._createTodoFormGroup(todo)));
      this._changeDetectorRef.markForCheck();
    }
  }

  private _createTodoFormGroup(todo: Todo): UntypedFormGroup {
    return this._formBuilder.group({
      id: [todo.id, [Validators.required]],
      description: [todo.description, [Validators.required]],
      isComplete: [todo.isComplete, [Validators.required]]
    })
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
