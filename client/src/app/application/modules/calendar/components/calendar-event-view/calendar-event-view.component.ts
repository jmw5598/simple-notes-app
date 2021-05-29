import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ICalendarEventsState } from '../../store/reducers';
import { DrawerService } from '@sn/shared/components';
import { tap } from 'rxjs/operators';
import { CalendarEvent, ResponseMessage } from '@sn/core/models';
import { buildCalendarEventFormGroup } from '@sn/shared/forms';
import { selectUpdateCalendarEventResponseMessage } from '../../store/selectors';
import { HEX_COLOR_STRING_ARRAY } from '@sn/shared/defaults/colors.defaults';

import * as calendarActions from '../../store/actions';

@Component({
  selector: 'sn-calendar-event-view',
  templateUrl: './calendar-event-view.component.html',
  styleUrls: ['./calendar-event-view.component.scss']
})
export class CalendarEventViewComponent implements OnInit {
  public form: FormGroup;
  public data$: Observable<CalendarEvent>;
  public responseMessage$: Observable<ResponseMessage>;
  public data: any;
  public calendarEventView: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _drawerService: DrawerService, 
    private _store: Store<ICalendarEventsState>
  ) {
    this.calendarEventView = 'display';
    this.form = buildCalendarEventFormGroup(this._formBuilder);
  }

  ngOnInit(): void {
    this.data$ = this._drawerService.onDataChange()
      .pipe(tap(data => this.data = data
      ));

    this.responseMessage$ = this._store.select(selectUpdateCalendarEventResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          console.log('get update event response message', message);
          if (message) {
            setTimeout(() => this._store.dispatch(
              calendarActions.setUpdateCalendarEventResponseMessage({ message: null })), 3000);
          }
        })
      );
  }

  public onEdit(): void {
    if (this.calendarEventView.toLowerCase() === 'display') {
      this.calendarEventView = 'edit';
    } else {
      this.calendarEventView = 'display';
    }
  }

  public onDelete(): void {
    this._store.dispatch(calendarActions.deleteCalendarEvent({ id: this.data.id || -1 }))
    this._drawerService.close();  // TODO Select delete response message and close if successful!
  }

  public onUpdate(value: any): void {
    const startDateTime: Date = this._generateDateTimeValue(
      new Date(value.startDate), new Date(value.startTime));
    const endDateTime: Date = this._generateDateTimeValue(
      new Date(value.endDate), new Date(value.endTime));
    
    const event: CalendarEvent = {
      id: value.id,
      title: value.title || '',
      location: value.location || '',
      description: value.description || '',
      startDateTime: startDateTime || new Date(),
      endDateTime: endDateTime || new Date(),
      isAllDay: value.isAllDay || false,
      color: value.color || HEX_COLOR_STRING_ARRAY[0]

    } as CalendarEvent;

    this._store.dispatch(calendarActions.updateCalendarEvent({ id: event.id, event: event }));
  }

  public onCancel(): void {
    this._drawerService.close();
  }

  private _generateDateTimeValue(date: Date, time: Date): Date {
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(time.getSeconds());
    return date;
  }
}
