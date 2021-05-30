import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '@sn/shared/models';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { Subject } from 'rxjs';
import { debounceTime, skip, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sn-todos-form',
  templateUrl: './todos-form.component.html',
  styleUrls: ['./todos-form.component.scss']
})
export class TodosFormComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly FORM_DEBOUNCE_TIME: number = 500;
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  public form: FormGroup;

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
    private _formBuilder: FormBuilder
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

  // THIS NEEDS TO CHANGE
  private _listenForTodosFormChanges(): void {
    this.form.valueChanges
      .pipe(
        skip(1),
        takeUntil(this._subscriptionSubject),
        debounceTime(this.FORM_DEBOUNCE_TIME)
      )
      .subscribe(formValues => {
        this.onUpdate.emit((formValues?.todos || []) as Todo[])
        console.log("updating form values change")
      });
  }

  // TODO This fires update http requests on initial load of component FIX THIS
  private _patchTodosToForm(todos: Todo[]): void {
    if (this.form && todos?.length) {
      const todosFormArray: FormArray = this.form.get('todos') as FormArray;
      todosFormArray.patchValue(
        todos.map((todo: Todo) => this._createTodoFormGroup(todo)),
        { onlySelf: false, emitEvent: false }
      )
      todos.forEach(todo => todosFormArray.push(this._createTodoFormGroup(todo)));
      

      // this.form.patchValue({
      //   todos: todos.map(todo => this._createTodoFormGroup(todo))
      // }, { onlySelf: true, emitEvent: false })
    }
  }

  private _createTodoFormGroup(todo: Todo): FormGroup {
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
