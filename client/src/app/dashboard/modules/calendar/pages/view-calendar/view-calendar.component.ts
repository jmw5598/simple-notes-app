import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAppState } from '@sn/core/store/state';
import { CalendarOptions, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import { DrawerService } from '@sn/shared/components';
import { CalendarEventDetailsComponent } from '../../components/calendar-event-details/calendar-event-details.component';
import { CalendarEventAddModalComponent } from '../../components/calendar-event-add-modal/calendar-event-add-modal.component';
import { fadeAnimation } from '@sn/shared/animations';
import { CALENDAR_OPTIONS_DEFAULT } from '../../calendar-options.defaults';
import { CalendarEvent } from '@sn/core/models';
import { 
  getCalendarEventsBetweenDates, 
  setCurrentCalendarEvents,
  setCurrentCalendarDateRanges } from '@sn/core/store/actions';
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
      CalendarEventAddModalComponent,
      { date: new Date(args.date) }
    )
  }

  public handleCalendarEventClick(args): void {
    this._drawerService.show(
      CalendarEventDetailsComponent,
      args.event.extendedProps
    )
  }

  public handleCalendarEventSourceLoading(args): void {
    console.log("loading? ", args);
    // TODO creating loading spinner??
  }

  private _configureCalendarOptions(): void {
    this.calendarOptions = CALENDAR_OPTIONS_DEFAULT;
    this.calendarOptions.dateClick = this.handleCalendarDateClick.bind(this);
    this.calendarOptions.eventClick = this.handleCalendarEventClick.bind(this);
    this.calendarOptions.loading = this.handleCalendarEventSourceLoading.bind(this);
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

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
