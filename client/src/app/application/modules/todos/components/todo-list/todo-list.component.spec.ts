import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyDataComponent } from '@sn/shared/components/empty-data/empty-data.component';
import { TodoList } from '@sn/shared/models';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  const mockTodoList: TodoList = {
    id: 123,
    title: 'Testing Todo List',
    todos: []
  } as TodoList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        EmptyDataComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when create() is called', () => {
    spyOn(component.onCreate, 'emit');
    component.create();
    expect(component.onCreate.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit mock todo list when view() is called', () => {
    spyOn(component.onView, 'emit');
    component.view(mockTodoList);
    expect(component.onView.emit).toHaveBeenCalledTimes(1);
    expect(component.onView.emit).toHaveBeenCalledWith(mockTodoList);
  });

  it('should emit mock todo list when edit() is called', () => {
    spyOn(component.onEdit, 'emit');
    component.edit(mockTodoList);
    expect(component.onEdit.emit).toHaveBeenCalledTimes(1);
    expect(component.onEdit.emit).toHaveBeenCalledWith(mockTodoList);
  });

  it('should emit mock todo list id when delete() is called', () => {
    spyOn(component.onDelete, 'emit');
    component.delete(mockTodoList.id);
    expect(component.onDelete.emit).toHaveBeenCalledTimes(1);
    expect(component.onDelete.emit).toHaveBeenCalledWith(mockTodoList.id);
  })
});
