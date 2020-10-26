import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventUpdateComponent } from './calendar-event-update.component';

describe('CalendarEventUpdateComponent', () => {
  let component: CalendarEventUpdateComponent;
  let fixture: ComponentFixture<CalendarEventUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEventUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
