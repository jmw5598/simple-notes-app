import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICalendarEventsState } from '@sn/user/application/modules/calendar/store/reducers';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { createCalendarEvent, setCreateCalendarEventResponseMessage } from '@sn/user/application/modules/calendar/store/actions';
import { selectCreateCalendarEventResponseMessage } from '@sn/user/application/modules/calendar/store/selectors';
import { CalendarEvent, ResponseMessage } from '@sn/shared/models';
import { showHide } from '@sn/shared/animations';
import { buildCalendarEventFormGroup } from '../calendar-event-form/calendar-event-form.builder';
import { SnCalendarEventFormComponent } from '../calendar-event-form/calendar-event-form.component';
import { HEX_COLOR_STRING_ARRAY } from '../../defaults/colors.defaults';

import { SnDrawerService } from '@sn/drawer';
import { toDateTimePickerFormat } from '@sn/user/shared/utils';

@Component({
  selector: 'sn-user-calendar-event-create',
  templateUrl: './calendar-event-create.component.html',
  styleUrls: ['./calendar-event-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHide]
})
export class SnCalendarEventCreateComponent implements OnInit, AfterViewInit {
  @ViewChild(SnCalendarEventFormComponent, { static: true })
  public calendarEventForm: SnCalendarEventFormComponent;

  public form: UntypedFormGroup;
  public data$: Observable<any>;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _store: Store<ICalendarEventsState>,
    private _formBuilder: UntypedFormBuilder,
    private _drawerService: SnDrawerService,
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
            this.form.get('startDate').patchValue(toDateTimePickerFormat(selectedDate));
            this.form.get('endDate').patchValue(toDateTimePickerFormat(selectedDate));
            this._changeDetectorRef.markForCheck();
          }
        })
    })
  }

  public hide(): void {
    this._drawerService.close()
  }
  
  public onSubmit(value: any): void {
    const event: CalendarEvent = {
      title: value.title || '',
      location: value.location || '',
      description: value.description || '',
      startDateTime: new Date(value.startDate),
      endDateTime: new Date(value.endDate),
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
