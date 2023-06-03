import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, withLatestFrom } from 'rxjs/operators';
import { ICalendarEventsState } from '../../store/reducers';
import { CalendarOptions, EventInput, EventSourceInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarEventViewComponent } from '../../components/calendar-event-view/calendar-event-view.component';
import { CALENDAR_OPTIONS_DEFAULT } from '../../calendar-options.defaults';
import { CalendarEvent } from '@sn/shared/models';

import * as calendarSelectors from '../../store/selectors';
import * as calendarActions from '../../store/actions';
import { TodoList } from '@sn/shared/models';
import { CalendarTodoListViewComponent } from '../../components/calendar-todo-list-view/calendar-todo-list-view.component';
import { CalendarEventCreateMenuComponent } from '../../components/calendar-event-create-menu/calendar-event-create-menu.component';

import { DrawerService, OverlayLoaderService } from '@sn/shared/components';
import { fadeAnimation } from '@sn/shared/animations';

enum CalendarEventType {
  EVENT = 'calendarEvent',
  TODO_LIST = 'calendarTodoList'
}

@Component({
  selector: 'sn-user-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private _drawerService: DrawerService,
    private _overlayLoaderService: OverlayLoaderService
  ) {
    this._subscriptionSubject = new Subject<void>();
    this._configureCalendarOptions();
  }

  ngOnInit(): void {
    this._listenForCurrentCalendarEventsChanges();
    this._listenForCurrentCalendarTodoListsChanges();
    this._listenForSelectedCalendarEventChanges();
    this._listenForSelectedCalendarTodoListChanges();
  }

  public handleCalendarEvevntDidMount(args): void {
    const eventIcon = document.createElement('i');
    const sourceType: CalendarEventType = args?.event?.source?.id || CalendarEventType.EVENT;
    switch (sourceType) {
      case CalendarEventType.EVENT:
        eventIcon.classList.add('far');
        eventIcon.classList.add('fa-calendar-alt');
        eventIcon.classList.add('icon-margin');
        break;
      case CalendarEventType.TODO_LIST:
        eventIcon.classList.add('fas');
        eventIcon.classList.add('fa-clipboard-check');
        eventIcon.classList.add('icon-margin');
        break;
    }
    args.el
      .querySelector('.fc-event-title')
      .prepend(eventIcon);
  } 

  public handleCalendarEventsFetch(info, success, error): void {
    this._overlayLoaderService.setLoadingState(true);
    const startDate: Date = new Date(info.startStr);
    const endDate: Date = new Date(info.endStr);
    this._store.dispatch(calendarActions.setCurrentCalendarEvents({ events: null }));
    this._store.dispatch(calendarActions.setCurrentCalendarDateRanges({ startDate, endDate }));
    this._store.dispatch(calendarActions.getCalendarEventsBetweenDates({
      startDate: startDate,
      endDate: endDate
    }));
    success([]);
  }

  public handleCalendarTodoListsFetch(info, success, error): void {
    this._overlayLoaderService.setLoadingState(true);
    const startDate: Date = new Date(info.startStr);
    const endDate: Date = new Date(info.endStr);
    this._store.dispatch(calendarActions.setCurrentCalendarTodoLists({ todoLists: null }));
    this._store.dispatch(calendarActions.setCurrentCalendarDateRanges({ startDate, endDate }));
    this._store.dispatch(calendarActions.getCalendarTodoListsBetweenDates({
      startDate: startDate,
      endDate: endDate
    }));
    success([]);
  }

  public handleCalendarDateClick(args): void {
    this._drawerService.show(
      CalendarEventCreateMenuComponent,
      { data: { date: new Date(args.date) } }
    )
  }

  public handleCalendarEventClick(args): void {
    const sourceType: CalendarEventType = args?.event?.source?.id || CalendarEventType.EVENT;
    switch (sourceType) {
      case CalendarEventType.EVENT:
        this._handleCalendarEventClick(args);
        break;
      case CalendarEventType.TODO_LIST:
        this._handleCalendarTodoListCLick(args);
        break;
    }
  }

  public handleCalendarEventSourceLoading(args): void {
    if (args) {
      setTimeout(() => this.areCalendarEventsLoading = true);
    } else {
      setTimeout(() => this.areCalendarEventsLoading = false);
    }
  }

  public handleCalendarEventEdit(args): void {
    const sourceType: CalendarEventType = args?.event?.source?.id || CalendarEventType.EVENT;
    switch (sourceType) {
      case CalendarEventType.EVENT:
        this._handleCalendarEventEdit(args);
        break;
      case CalendarEventType.TODO_LIST:
        console.log("todo list dropped");
        this._handleCalendarTodoListEdit(args);
        break;
    }
    return;
    
  }

  private _handleCalendarEventEdit(args: any): void {
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

    this._store.dispatch(calendarActions.updateCalendarEvent({ 
      id: newEvent.id, 
      event: newEvent
    }));

    // This is needed to reset the response message from the update so the alert doesn't show int the drawer
    // TODO: Need to look into a better way to do this.
    setTimeout(() => {
      this._store.dispatch(calendarActions.setUpdateCalendarEventResponseMessage({ message: null }));
    }, 200);
  }

  private _handleCalendarTodoListEdit(args: any): void {
    const oldTodoList: TodoList = args.event.extendedProps;
    const newStartedBy: Date = new Date(args.event.start);
    const newCompletedBy: Date = new Date(args.event.end);

    const newTodoList: TodoList = {
      ...oldTodoList,
      startedBy: newStartedBy,
      completedBy: newCompletedBy
    } as TodoList;

    this._store.dispatch(calendarActions.updateCalendarTodoList({ 
      id: newTodoList.id,
      todoList: newTodoList
    }));

    // This is needed to reset the response message from the update so the alert doesn't show int the drawer
    // TODO: Need to look into a better way to do this.
    setTimeout(() => {
      this._store.dispatch(
        calendarActions.setUpdateCalendarTodoListResponseMessage({ message: null })
      );
    }, 200);
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
    this.calendarOptions.eventResize = this.handleCalendarEventEdit.bind(this);
    this.calendarOptions.eventDidMount = this.handleCalendarEvevntDidMount.bind(this);
    this.calendarOptions.eventSources = [
      { id: CalendarEventType.EVENT, events: this.handleCalendarEventsFetch.bind(this) },
      { id: CalendarEventType.TODO_LIST, events: this.handleCalendarTodoListsFetch.bind(this) }
    ];
    this.calendarOptions.eventDataTransform = this.handleEventDataTransform.bind(this);
  }

  private _listenForCurrentCalendarEventsChanges(): void {
    this._store.select(calendarSelectors.selectCurrentCalendarEvents)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((events: CalendarEvent[]) => {
        if (events) {
          const renderableEvents = this._mapCalendarEvents(events)
          this.calendar?.getApi()?.getEventSourceById(CalendarEventType.EVENT)?.remove();
          this.calendar?.getApi().addEventSource({
            events: renderableEvents,
            id: CalendarEventType.EVENT
          })
          this._overlayLoaderService.setLoadingState(false);
        }
      });
  }

  private _listenForSelectedCalendarEventChanges(): void {
    this._store.select(calendarSelectors.selectSelectedCalendarEvent)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((event: CalendarEvent) => {
        this._drawerService.setData(event);
      })
  }

  private _listenForSelectedCalendarTodoListChanges(): void {
    this._store.select(calendarSelectors.selectCreateCalendarEventResponseMessage)
      .pipe(
        withLatestFrom(this._store.select(calendarSelectors.selectCurrentCalendarDateRanges)),
        takeUntil(this._subscriptionSubject)   
      )
      .subscribe(([message, ranges]) => {
        if (message && ranges) {
          this._store.dispatch(calendarActions.getCalendarEventsBetweenDates({ 
            startDate: ranges.startDate,
            endDate: ranges.endDate
          }));
        }
      });
  }

  private _listenForCurrentCalendarTodoListsChanges(): void {
    this._store.select(calendarSelectors.selectCurrentCalendarTodoLists)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe((todoLists: TodoList[]) => {
        if (todoLists) {
          // TODO check if event source exists first then clean and update events???
          const renderableEvents = this._mapCalendarTodoLists(todoLists)
          this.calendar?.getApi()?.getEventSourceById(CalendarEventType.TODO_LIST)?.remove();
          this.calendar?.getApi()?.addEventSource({
            events: renderableEvents,
            id: CalendarEventType.TODO_LIST
          } as EventSourceInput)
          this._overlayLoaderService.setLoadingState(false);
        }
      });
  }

  private _handleCalendarEventClick(args): void {
    this._drawerService.show(
      CalendarEventViewComponent,
      { data: args.event.extendedProps }
    );
  }

  private _handleCalendarTodoListCLick(args): void {
    this._drawerService.show(
      CalendarTodoListViewComponent,
      { data: args.event.extendedProps }
    );
  }

  private _mapCalendarEvents(events: CalendarEvent[]): EventInput[] {
    return events?.map((event: CalendarEvent) => {
      return {
        id: event.id.toString(),
        title: event.title,
        start: event.startDateTime,
        end: event.endDateTime,
        allDay: event.isAllDay,
        extendedProps: event,
        color: event.color,
        sourceId: CalendarEventType.EVENT
      } as EventInput
    }) as EventInput[];
  } 

  private _mapCalendarTodoLists(todoLists: TodoList[]): EventInput[] {
    return todoLists?.map((todoList: TodoList) => {
      return {
        id: todoList.id.toString(),
        title: todoList.title,
        start: todoList.startedBy,
        end: todoList.completedBy,
        allDay: true,
        extendedProps: todoList
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
    this._store.dispatch(calendarActions.setCurrentCalendarEvents({ events: null }));
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
