import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListUpdateComponent } from './todo-list-update.component';

describe('TodoListUpdateComponent', () => {
  let component: TodoListUpdateComponent;
  let fixture: ComponentFixture<TodoListUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
