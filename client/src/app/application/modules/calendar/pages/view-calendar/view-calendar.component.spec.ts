import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { FullCalendarModule } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { ViewCalendarComponent } from './view-calendar.component';
import { SharedModule } from '@sn/shared/shared.module';
import { getCalendarEventsBetweenDates, setCurrentCalendarDateRanges, setCurrentCalendarEvents } from '../../store/actions';
import { CalendarEvent } from '@sn/core/models';
import { DrawerService } from '@sn/shared/components';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

fdescribe('ViewCalendarComponent', () => {
  let component: ViewCalendarComponent;
  let fixture: ComponentFixture<ViewCalendarComponent>;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) {
      return this._data.asObservable()
    },
    dispatch: function(action: any) {
      this._data.next(action);
    }
  };

  const testDrawerService = {
    show(type: any, args: any) { return of([])},
    onDrawerVibilityChange() {},
    setData(data: any) {}
  }

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
          { provide: DrawerService, useValue: testDrawerService },
          { provide: Store, useValue: testStore },
        ]
      }).compileComponents();

      // TODO Figure out how component providers should get their 
      // providers.  It gets differenct instance from the module providers
      // and spys are not working.
      // TestBed.overrideComponent(ViewCalendarComponent, {
      //   set: {
      //     providers: [{ provide: DrawerService, useValue: testDrawerService }]
      //   }
      // })
      
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  });

  afterEach(() => {
    component.ngOnDestroy();
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

  // TODO Implements this once the above todo is resolved.
  // it('should call DrawerService.show to show new calendar event form for selected day', () => {
    // spyOn(testDrawerService, 'show');
    // const clickEventArgs = { args: new Date() };
    // component.handleCalendarDateClick(clickEventArgs);
    // expect(testDrawerService.show).toHaveBeenCalled();    
  // });
});
