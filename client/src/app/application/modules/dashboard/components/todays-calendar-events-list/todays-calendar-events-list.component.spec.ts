import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysCalendarEventsListComponent } from './todays-calendar-events-list.component';

describe('TodaysCalendarEventsListComponent', () => {
  let component: TodaysCalendarEventsListComponent;
  let fixture: ComponentFixture<TodaysCalendarEventsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysCalendarEventsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysCalendarEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
