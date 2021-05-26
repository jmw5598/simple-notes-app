import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosFormComponent } from './todos-form.component';

describe('TodosFormComponent', () => {
  let component: TodosFormComponent;
  let fixture: ComponentFixture<TodosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
