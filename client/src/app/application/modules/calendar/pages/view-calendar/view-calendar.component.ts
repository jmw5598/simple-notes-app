import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ICalendarEventsState } from '../../store/reducers';
import { CalendarOptions, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import { DrawerService, CalendarEventCreateComponent } from '@sn/shared/components';
import { CalendarEventViewComponent } from '../../components/calendar-event-view/calendar-event-view.component';
import { fadeAnimation } from '@sn/shared/animations';
import { CALENDAR_OPTIONS_DEFAULT } from '../../calendar-options.defaults';
import { CalendarEvent, ResponseMessage } from '@sn/core/models';
import { 
  getCalendarEventsBetweenDates, 
  setCurrentCalendarEvents,
  setCurrentCalendarDateRanges, 
  updateCalendarEvent, 
  setUpdateCalendarEventResponseMessage} from '../../store/actions';
import { 
  selectUpdateCalendarEventResponseMessage, 
  selectCurrentCalendarEvents, 
  selectSelectedCalendarEvent } from '../../store/selectors';

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
  public calendarOptions: CalendarOptions | any = CALENDAR_OPTIONS_DEFAULT;
  public areCalendarEventsLoading: boolean = false;

  constructor(
    private _store: Store<ICalendarEventsState>,
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
          const renderableEvents = this._mapCalendarEvents(events)
          this.calendar.getApi().removeAllEvents();
          renderableEvents.forEach(e => this.calendar.getApi().addEvent(e))
        }
      });
    this._store.select(selectSelectedCalendarEvent)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((event: CalendarEvent) => {
        this._drawerService.setData(event);
      })
    this._store.select(selectUpdateCalendarEventResponseMessage)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((message: ResponseMessage) => {
          if (message) {
            // Set response message to null to prevent alert form display if edit is selected from drawer.
            // Should probably notify with toast message that the evetn has been updated??
            this._store.dispatch(setUpdateCalendarEventResponseMessage({ message: null }));
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
      { data: { date: new Date(args.date) } }
    )
  }

  public handleCalendarEventClick(args): void {
    this._drawerService.show(
      CalendarEventViewComponent,
      args.event.extendedProps
    )
  }

  public handleCalendarEventSourceLoading(args): void {
    if (args) {
      setTimeout(() => this.areCalendarEventsLoading = true);
    } else {
      setTimeout(() => this.areCalendarEventsLoading = false);
    }
  }

  public handleCalendarEventEdit(args): void {
    console.log("updateing calendar event");
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

  public handleEventDataTransform(event: any) {
    const endDate: Date = new Date(event.end);
    if (event.allDay && endDate.getHours() === 0) {
      endDate.setHours(endDate.getHours() + 23);
      endDate.setMinutes(endDate.getMinutes() + 59);
      event.end = endDate;
    }
    return event;
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
    this.calendarOptions.eventDataTransform = this.handleEventDataTransform.bind(this);
  }

  private _mapCalendarEvents(events: CalendarEvent[]): EventInput[] {
    return events.map((event: CalendarEvent) => {
      return {
        id: event.id.toString(),
        title: event.title,
        start: event.startDateTime,
        end: event.endDateTime,
        allDay: event.isAllDay,
        extendedProps: event,
        color: event.color,
      } as EventInput
    }) as EventInput[];
  } 

  private _generateDateTimeValue(date: Date, time: Date): Date {
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(time.getSeconds());
    return date;
  }

  ngOnDestroy(): void {
    this._store.dispatch(setCurrentCalendarEvents({ events: null }));
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
