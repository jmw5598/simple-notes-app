import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventCreateComponent } from './calendar-event-create.component';

describe('CalendarEventCreateComponent', () => {
  let component: CalendarEventCreateComponent;
  let fixture: ComponentFixture<CalendarEventCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEventCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
