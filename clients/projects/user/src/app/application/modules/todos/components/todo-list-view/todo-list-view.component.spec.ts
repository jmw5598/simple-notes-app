import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DrawerService } from '@sn/shared/components';
import { TodoList } from '@sn/shared/models';
import { SharedModule } from '@sn/shared/shared.module';
import { BehaviorSubject, of } from 'rxjs';

import { TodoListViewComponent } from './todo-list-view.component';
import * as todosActions from '../../store/actions';

describe('TodoListViewComponent', () => {
  let component: TodoListViewComponent;
  let fixture: ComponentFixture<TodoListViewComponent>;

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
        TodoListViewComponent
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
    fixture = TestBed.createComponent(TodoListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Store.disptach when onSave is called with mockTodoList', () => {
    spyOn(testStore, 'dispatch');
    component.onSave(mockTodoList);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    expect(testStore.dispatch).toHaveBeenCalledWith(
      todosActions.updateTodoList({
        todoListId: mockTodoList.id,
        todoList: mockTodoList
      })
    );
  });

  it('should call DrawerServiec.close when onCancel is called', () => {
    spyOn(testDrawerService, 'close');
    component.onCancel();
    expect(testDrawerService.close).toHaveBeenCalledTimes(1);
  });
});
