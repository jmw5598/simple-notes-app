import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTodoListViewComponent } from './calendar-todo-list-view.component';

describe('CalendarTodoListViewComponent', () => {
  let component: CalendarTodoListViewComponent;
  let fixture: ComponentFixture<CalendarTodoListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarTodoListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTodoListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
