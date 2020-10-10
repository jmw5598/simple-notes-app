import { Component, OnInit, Input, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { CalendarEvent, ResponseMessage } from '@sn/core/models';
import { selectUpdateCalendarEventResponseMessage } from '@sn/core/store/selectors';
import { setUpdateCalendarEventResponseMessage } from '@sn/core/store/actions';
import { CalendarEventFormComponent } from '../calendar-event-form/calendar-event-form.component';

@Component({
  selector: 'sn-calendar-event-update',
  templateUrl: './calendar-event-update.component.html',
  styleUrls: ['./calendar-event-update.component.scss']
})
export class CalendarEventUpdateComponent implements OnInit, AfterViewInit {
  @ViewChild(CalendarEventFormComponent, { static: true })
  public calendarEventForm: CalendarEventFormComponent;

  @Input()
  public event: CalendarEvent;

  public form: FormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _store: Store<IAppState>,
    private _parentControl: ControlContainer
  ) { }

  ngOnInit(): void {
    this.responseMessage$ = this._store.select(selectUpdateCalendarEventResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          this.calendarEventForm.reset();
          setTimeout(() => this._store.dispatch(setUpdateCalendarEventResponseMessage({ message: null })), 3000);
        })
      );
    this.form = this._parentControl.control as FormGroup;
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.form && this.event) {
        const startDateTime: Date = new Date(this.event.startDateTime);
        const endDateTime: Date = new Date(this.event.endDateTime);
        const formValue: {[key: string]: any} = {
          ...this.event,
          startDate: startDateTime, 
          startTime: startDateTime,
          endDate: endDateTime,
          endTime: endDateTime
        }
        this.form.patchValue(formValue);
      }
    })
  }
}
