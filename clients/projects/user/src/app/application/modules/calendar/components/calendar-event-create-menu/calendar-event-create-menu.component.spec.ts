import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventCreateMenuComponent } from './calendar-event-create-menu.component';

describe('CalendarEventCreateMenuComponent', () => {
  let component: CalendarEventCreateMenuComponent;
  let fixture: ComponentFixture<CalendarEventCreateMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarEventCreateMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventCreateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
