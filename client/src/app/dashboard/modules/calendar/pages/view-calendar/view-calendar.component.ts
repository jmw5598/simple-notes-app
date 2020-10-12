import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAppState } from '@sn/core/store/state';
import { CalendarOptions, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import { DrawerService, CalendarEventCreateComponent } from '@sn/shared/components';
import { CalendarEventViewComponent } from '../../components/calendar-event-view/calendar-event-view.component';
import { fadeAnimation } from '@sn/shared/animations';
import { CALENDAR_OPTIONS_DEFAULT } from '../../calendar-options.defaults';
import { CalendarEvent } from '@sn/core/models';
import { 
  getCalendarEventsBetweenDates, 
  setCurrentCalendarEvents,
  setCurrentCalendarDateRanges, updateCalendarEvent } from '@sn/core/store/actions';
import { selectCurrentCalendarEvents } from '@sn/core/store/selectors';

@Component({
  selector: 'sn-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss'],
  providers: [DrawerService],
  animations: [fadeAnimation]
})
export class ViewCalendarComponent implements OnInit, OnDestroy {
  @ViewChild('calendar', { static: true }) 
  public calendar : FullCalendarComponent;

  private _subscriptionSubject: Subject<void>; 
  public calendarOptions: CalendarOptions = CALENDAR_OPTIONS_DEFAULT;

  constructor(
    private _store: Store<IAppState>,
    private _drawerService: DrawerService
  ) {
    this._subscriptionSubject = new Subject<void>();
    this._configureCalendarOptions();
  }

  ngOnInit(): void {
    this._store.select(selectCurrentCalendarEvents)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((events: CalendarEvent[]) => {
        if (events) {
          this.calendarOptions.events = this._mapCalendarEvents(events);
        }
      });
  }

  public handleCalendarEventsFetch(info, success, error): void {
    const startDate: Date = new Date(info.startStr);
    const endDate: Date = new Date(info.endStr);
    
    this._store.dispatch(setCurrentCalendarEvents({ events: null }));
    this._store.dispatch(setCurrentCalendarDateRanges({ startDate, endDate }));
    this._store.dispatch(getCalendarEventsBetweenDates({
      startDate: startDate,
      endDate: endDate
    }));

    success([]);
  }

  public handleCalendarDateClick(args): void {
    this._drawerService.show(
      CalendarEventCreateComponent,
      { date: new Date(args.date) }
    )
  }

  public handleCalendarEventClick(args): void {
    this._drawerService.show(
      CalendarEventViewComponent,
      args.event.extendedProps
    )
  }

  public handleCalendarEventSourceLoading(args): void {
    console.log("loading? ", args);
    // TODO creating loading spinner??
  }

  public handleCalendarEventEdit(args): void {
    const oldEvent: CalendarEvent = args.event.extendedProps;
    const newStartDateTime: Date = this._generateDateTimeValue(
      new Date(args.event.start), new Date(oldEvent.startDateTime));
    
    const newEndDateTime: Date = this._generateDateTimeValue(
      new Date(args.event.end), new Date(oldEvent.endDateTime));

    const newEvent: CalendarEvent = {
      ...oldEvent,
      startDateTime: newStartDateTime,
      endDateTime: newEndDateTime
    } as CalendarEvent;

    this._store.dispatch(updateCalendarEvent({ 
      id: newEvent.id, 
      event: newEvent
    }));
  }

  private _configureCalendarOptions(): void {
    this.calendarOptions = CALENDAR_OPTIONS_DEFAULT;
    this.calendarOptions.dateClick = this.handleCalendarDateClick.bind(this);
    this.calendarOptions.eventClick = this.handleCalendarEventClick.bind(this);
    this.calendarOptions.loading = this.handleCalendarEventSourceLoading.bind(this);
    this.calendarOptions.eventDrop = this.handleCalendarEventEdit.bind(this);
    this.calendarOptions.eventResize = this.handleCalendarEventEdit.bind(this)
    this.calendarOptions.eventSources = [
      { id: 'calendarEventSource', events: this.handleCalendarEventsFetch.bind(this) }
    ];
  }

  private _mapCalendarEvents(events: CalendarEvent[]): EventInput[] {
    return events.map((event: CalendarEvent) => {
      return {
        id: event.id.toString(),
        title: event.title,
        start: event.startDateTime,
        end: event.endDateTime,
        allDay: event.isAllDay,
        extendedProps: event
      } as EventInput
    }) as EventInput[];
  } 

  private _generateDateTimeValue(date: Date, time: Date): Date {
    console.log("date", date);
    console.log("time", time);
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(time.getSeconds());
    return date;
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
