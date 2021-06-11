import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DrawerService } from '@sn/shared/components';
import { TodoList } from '@sn/shared/models';
import { SharedModule } from '@sn/shared/shared.module';
import { BehaviorSubject, of } from 'rxjs';

import { TodoListEditComponent } from './todo-list-edit.component';

import * as todoActions from '../../store/actions';

describe('TodoListEditComponent', () => {
  let component: TodoListEditComponent;
  let fixture: ComponentFixture<TodoListEditComponent>;

  const mockTodoList: TodoList = {
    id: 123,
    title: 'Testing Todo List',
    todos: []
  } as TodoList

  const testDrawerService = {
    close: () => {},
    show: (component) => {},
    onDataChange: () => { return of(mockTodoList) }
  }

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) { this._data.next(action) }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [
        TodoListEditComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        },
        {
          provide: DrawerService,
          useValue: testDrawerService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Store.dispatch when onUpdate is called with mockTodoList', () => {
    spyOn(testStore, 'dispatch');
    component.onUpdate(mockTodoList);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      todoActions.updateTodoList({
        todoListId: mockTodoList.id, todoList: mockTodoList
      })
    );
  });

  it('should call DrawerServiec.close when onCancel is called', () => {
    spyOn(testDrawerService, 'close');
    component.onCancel();
    expect(testDrawerService.close).toHaveBeenCalledTimes(1);
  });
});
