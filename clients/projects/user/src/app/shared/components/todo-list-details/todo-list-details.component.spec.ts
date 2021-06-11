import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListDetailsComponent } from './todo-list-details.component';

describe('TodoListDetailsComponent', () => {
  let component: TodoListDetailsComponent;
  let fixture: ComponentFixture<TodoListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
