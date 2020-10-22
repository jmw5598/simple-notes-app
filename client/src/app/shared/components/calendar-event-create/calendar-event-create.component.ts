import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DrawerService } from '../drawer/drawer.service';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { createCalendarEvent, setCreateCalendarEventResponseMessage } from '@sn/core/store/actions';
import { selectCreateCalendarEventResponseMessage } from '@sn/core/store/selectors';
import { CalendarEvent, ResponseMessage } from '@sn/core/models';
import { showHide } from '../../animations';
import { buildCalendarEventFormGroup } from '../../forms/calendar-event-form/calendar-event-form.builder';
import { CalendarEventFormComponent } from '../../forms/calendar-event-form/calendar-event-form.component';
import { HEX_COLOR_STRING_ARRAY } from '../../defaults/colors.defaults';

@Component({
  selector: 'sn-calendar-event-create',
  templateUrl: './calendar-event-create.component.html',
  styleUrls: ['./calendar-event-create.component.scss'],
  animations: [showHide]
})
export class CalendarEventCreateComponent implements OnInit, AfterViewInit {
  @ViewChild(CalendarEventFormComponent, { static: true })
  public calendarEventForm: CalendarEventFormComponent;

  public form: FormGroup;
  public data$: Observable<any>;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _store: Store<IAppState>,
    private _formBuilder: FormBuilder,
    private _drawerService: DrawerService,
  ) { }

  ngOnInit(): void {
    this.data$ = this._drawerService.onDataChange();
    this.responseMessage$ = this._store.select(selectCreateCalendarEventResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          if (message) {
            this.calendarEventForm.reset();
          setTimeout(() => this._store.dispatch(setCreateCalendarEventResponseMessage({ message: null })), 3000);
          }
        })
      );
    this.form = buildCalendarEventFormGroup(this._formBuilder);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.data$.pipe(take(1))
        .subscribe(data => {
          if (data && data.date) {
            const selectedDate: Date = new Date(data.date);
            this.form.get('startDate').patchValue(selectedDate);
            this.form.get('endDate').patchValue(selectedDate);
          }
        })
    })
  }

  public hide(): void {
    this._drawerService.close()
  }
  
  public onSubmit(value: any): void {
    const startDateTime: Date = this._generateDateTimeValue(
      new Date(value.startDate), new Date(value.startTime));
    const endDateTime: Date = this._generateDateTimeValue(
      new Date(value.endDate), new Date(value.endTime));

    const event: CalendarEvent = {
      title: value.title || '',
      location: value.location || '',
      description: value.description || '',
      startDateTime: startDateTime || new Date(),
      endDateTime: endDateTime || new Date(),
      isAllDay: value.isAllDay || false,
      color: value.color || HEX_COLOR_STRING_ARRAY[0]
    } as CalendarEvent;
    this._store.dispatch(createCalendarEvent({ event: event }));
  }

  public onClose(): void {
    this._drawerService.close();
  }

  private _generateDateTimeValue(date: Date, time: Date): Date {
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(time.getSeconds());
    return date;
  }
}
