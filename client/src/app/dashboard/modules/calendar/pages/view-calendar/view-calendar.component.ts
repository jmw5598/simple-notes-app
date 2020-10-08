import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { IAppState } from '@sn/core/store/state';
import {  } from '@fullcalendar/interaction';
import { CalendarOptions, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import { DrawerService } from '@sn/shared/components';
import { CalendarEventDetailsComponent } from '../../components/calendar-event-details/calendar-event-details.component';
import { CalendarEventAddModalComponent } from '../../components/calendar-event-add-modal/calendar-event-add-modal.component';
import { fadeAnimation } from '@sn/shared/animations';
import { CALENDAR_OPTIONS_DEFAULT } from '../../calendar-options.defaults';
import { getCalendarEventsBetweenDates, setCurrentCalendarEvents } from '@sn/core/store/actions';
import { selectCurrentCalendarEvents } from '@sn/core/store/selectors';
import { CalendarEvent } from '@sn/core/models';

@Component({
  selector: 'sn-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss'],
  providers: [DrawerService],
  animations: [fadeAnimation]
})
export class ViewCalendarComponent implements OnInit, OnDestroy {
  @ViewChild(FullCalendarComponent, { static: true }) 
  public calendar : FullCalendarComponent;

  private _subscriptionSubject: Subject<void>; 
  public calendarOptions: CalendarOptions = CALENDAR_OPTIONS_DEFAULT;

  constructor(
    private _store: Store<IAppState>,
    private _drawerService: DrawerService
  ) {
    this._subscriptionSubject = new Subject<void>();
    this.calendarOptions = CALENDAR_OPTIONS_DEFAULT;
    this.calendarOptions.dateClick = args => this.handleCalendarDateClick(args);
    this.calendarOptions.eventClick = args => this.handleCalendarEventClick(args);
    this.calendarOptions.loading = args => this.handleCalendarEventSourceLoading(args);
    this.calendarOptions.eventSources = [
      { 
        id: 'calendarEventSource', 
        events: (info, successCallback, errorCallback) => {
          this.handleCalendarEventsFetch(info, successCallback, errorCallback) 
        }
      }
    ]
  }

  ngOnInit(): void {
    // Listen for on update events and on create events and on delete events
    // call calendare refetch here instead of listening to new events
    this._store.select(selectCurrentCalendarEvents)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((events: CalendarEvent[]) => {
        if (events) {
          console.log("Recieve new calendar events", events);
          console.log(this.calendar)
        }
      })
  }

  public handleCalendarEventsFetch(info, success, error): void {
    const startDate: Date = new Date(info.startStr);
    const endDate: Date = new Date(info.endStr);
    this._store.dispatch(setCurrentCalendarEvents({ events: null })); 

    // TOOD make this outside of callback?
    // Will need to have to handle refresh calendare state
    // when adding, updateing a deleting events form the drawer component
    // will have to use ViewContainer to set the new events
    this._store.select(selectCurrentCalendarEvents)
      .pipe(take(2))
      .subscribe(events => {
        if (events) success(this._mapCalendarEvents(events));
      })
    
    this._store.dispatch(getCalendarEventsBetweenDates({
      startDate: startDate,
      endDate: endDate
    }));
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
    // TODO set loading spinner visible?
  }

  private _mapCalendarEvents(events: CalendarEvent[]): EventInput[] {
    return events.map((event: CalendarEvent) => {
      return {
        id: event.id.toString(),
        title: event.title,
        start: event.startDateTime,
        end: event.endDateTime,
        extendedProps: event
      } as EventInput
    }) as EventInput[];
  } 

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
