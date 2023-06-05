import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { FullCalendarModule } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { ViewCalendarComponent } from './view-calendar.component';
import { SharedModule } from '@sn/user/shared/shared.module';
import { getCalendarEventsBetweenDates, setCurrentCalendarDateRanges, setCurrentCalendarEvents } from '../../store/actions';
import { CalendarEvent } from '@sn/shared/models';
import { SnDrawerService } from '@sn/drawer';



describe('ViewCalendarComponent', () => {
  let component: ViewCalendarComponent;
  let fixture: ComponentFixture<ViewCalendarComponent>;
  let drawerService: SnDrawerService;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return of(null) },
    dispatch: function(action: any) {}
  };

  const mockCalendarEvent: CalendarEvent = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    startDateTime: new Date(),
    endDateTime: new Date(),
    description: 'Mock Description',
    title: 'Mock Title',
    isAllDay: false,
    location: 'Mock Location',
    color: '#000000'
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          NoopAnimationsModule,
          FullCalendarModule,
          SharedModule
        ],
        declarations: [ViewCalendarComponent],
        providers: [
          { 
            provide: Store, 
            useValue: testStore 
          },
        ]
      }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCalendarComponent);
    component = fixture.componentInstance;
    drawerService = fixture.debugElement.injector.get(SnDrawerService) as any;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
    jasmine.clock().install();
  });

  afterEach(() => {
    component.ngOnDestroy();
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch events to set store to null, fetch event between dates', () => {
    spyOn(testStore, 'dispatch');
    spyOn(testStore, 'select');
    const mockSuccessFunction = () => {};
    const mockInfoObject = {
      startStr: new Date('2020-01-01'),
      endStr: new Date('2020-01-30')
    };
    component.handleCalendarEventsFetch(mockInfoObject, mockSuccessFunction, null);
    expect(testStore.dispatch).toHaveBeenCalledWith(setCurrentCalendarEvents({ events: null}));
    expect(testStore.dispatch).toHaveBeenCalledWith(setCurrentCalendarDateRanges({
      startDate: mockInfoObject.startStr,
      endDate: mockInfoObject.endStr
    }));
    expect(testStore.dispatch).toHaveBeenCalledWith(getCalendarEventsBetweenDates({
      startDate: mockInfoObject.startStr,
      endDate: mockInfoObject.endStr
    }));
    expect(testStore.dispatch).toHaveBeenCalledTimes(3);
  });

  it('should call DrawerService.show to show new calendar event form for selected day', () => {
    spyOn(drawerService, 'show');
    const clickEventArgs = { args: new Date() };
    component.handleCalendarDateClick(clickEventArgs);
    expect(drawerService.show).toHaveBeenCalledTimes(1);
  });

  it('should call DrawerSerice.show when handleCalendarEventClick is called', () => {
    spyOn(drawerService, 'show');
    const clickEventArgs = { event: { extendedProps: mockCalendarEvent } };
    component.handleCalendarEventClick(clickEventArgs);
    expect(drawerService.show).toHaveBeenCalledTimes(1);
  });

  it('should set areCalendarEventsLoading to false when handleCalendarEventSourceLoading is called without args', () => {
    component.handleCalendarEventSourceLoading(null);
    jasmine.clock().tick(1);
    expect(component.areCalendarEventsLoading).toBeFalse();
  });

  it('should set areCalendarEventsLoading to true when handleCalendarEventSourceLoading is called with args', () => {
    component.handleCalendarEventSourceLoading({});
    jasmine.clock().tick(1);
    expect(component.areCalendarEventsLoading).toBeTrue();
  });

  //TODO handleCalendarEventEdit
  it('should dispatch updateCalendarEvent action when handleCalendarEventEdit is called', () => {
    spyOn(testStore, 'dispatch');
    const args = { event: { extendedProps: mockCalendarEvent } };
    component.handleCalendarEventEdit(args);
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
  });

  //TODO handleEventDataTransform
  // it('', () => {
    
  // });

  it('should dispatch setCurrentCalendarEvents action when ngOnDestroy is called', () => {
    spyOn(testStore, 'dispatch');
    component.ngOnDestroy();
    expect(testStore.dispatch).toHaveBeenCalledWith(setCurrentCalendarEvents({ events: null }));
  });
});
