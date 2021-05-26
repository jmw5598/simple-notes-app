import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListTodosFormComponent } from './todo-list-todos-form.component';

describe('TodoListTodosFormComponent', () => {
  let component: TodoListTodosFormComponent;
  let fixture: ComponentFixture<TodoListTodosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListTodosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListTodosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
