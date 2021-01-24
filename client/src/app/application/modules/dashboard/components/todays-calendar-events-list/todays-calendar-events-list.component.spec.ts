import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '@sn/shared/shared.module';
import { TodaysCalendarEventsListComponent } from './todays-calendar-events-list.component';

describe('TodaysCalendarEventsListComponent', () => {
  let component: TodaysCalendarEventsListComponent;
  let fixture: ComponentFixture<TodaysCalendarEventsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        TodaysCalendarEventsListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysCalendarEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
