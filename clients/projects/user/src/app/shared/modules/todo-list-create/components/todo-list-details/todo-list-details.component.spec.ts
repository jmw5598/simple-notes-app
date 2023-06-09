import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnTodoListDetailsComponent } from './todo-list-details.component';

describe('SnTodoListDetailsComponent', () => {
  let component: SnTodoListDetailsComponent;
  let fixture: ComponentFixture<SnTodoListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnTodoListDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnTodoListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
