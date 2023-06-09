import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnTodoListCreateComponent } from './todo-list-create.component';

describe('SnTodoListCreateComponent', () => {
  let component: SnTodoListCreateComponent;
  let fixture: ComponentFixture<SnTodoListCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnTodoListCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnTodoListCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
