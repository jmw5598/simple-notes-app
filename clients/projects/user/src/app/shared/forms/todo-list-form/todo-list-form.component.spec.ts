import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListFormComponent } from './todo-list-form.component';

describe('TodoListFormComponent', () => {
  let component: TodoListFormComponent;
  let fixture: ComponentFixture<TodoListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
