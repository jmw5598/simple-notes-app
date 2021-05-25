import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListCreateComponent } from './todo-list-create.component';

describe('TodoListCreateComponent', () => {
  let component: TodoListCreateComponent;
  let fixture: ComponentFixture<TodoListCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
