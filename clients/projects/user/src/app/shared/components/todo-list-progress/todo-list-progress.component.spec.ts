import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListProgressComponent } from './todo-list-progress.component';

describe('TodoListProgressComponent', () => {
  let component: TodoListProgressComponent;
  let fixture: ComponentFixture<TodoListProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
