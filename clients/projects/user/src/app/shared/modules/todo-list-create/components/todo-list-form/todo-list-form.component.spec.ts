import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnTodoListFormComponent } from './todo-list-form.component';

describe('SnTodoListFormComponent', () => {
  let component: SnTodoListFormComponent;
  let fixture: ComponentFixture<SnTodoListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnTodoListFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnTodoListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
