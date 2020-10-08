import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventAddModalComponent } from './calendar-event-add-modal.component';

describe('CalendarEventAddModalComponent', () => {
  let component: CalendarEventAddModalComponent;
  let fixture: ComponentFixture<CalendarEventAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEventAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
