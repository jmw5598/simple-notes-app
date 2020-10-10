import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventFormComponent } from './calendar-event-form.component';

describe('CalendarEventFormComponent', () => {
  let component: CalendarEventFormComponent;
  let fixture: ComponentFixture<CalendarEventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEventFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
