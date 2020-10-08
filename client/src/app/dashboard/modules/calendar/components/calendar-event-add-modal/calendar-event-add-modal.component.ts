import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { DrawerService } from '@sn/shared/components';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { createCalendarEvent, setCreateCalendarEventResponseMessage } from '@sn/core/store/actions';
import { selectCreateCalendarEventResponseMessage } from '@sn/core/store/selectors';
import { CalendarEvent, ResponseMessage } from '@sn/core/models';
import { showHide } from '@sn/shared/animations';

@Component({
  selector: 'sn-calendar-event-add-modal',
  templateUrl: './calendar-event-add-modal.component.html',
  styleUrls: ['./calendar-event-add-modal.component.scss'],
  animations: [showHide]
})
export class CalendarEventAddModalComponent implements OnInit, AfterViewInit {
  public datepickerConfig = { adaptivePosition: true, containerClass: 'theme-blue' };
  public form: FormGroup;
  public data$: Observable<any>;
  public responseMessage$: Observable<ResponseMessage>;

  public startTime: any;
  public endTime: any;

  constructor(
    private _store: Store<IAppState>,
    private _formBuilder: FormBuilder,
    private _drawerService: DrawerService,
    private _renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.data$ = this._drawerService.onDataChange();
    this.responseMessage$ = this._store.select(selectCreateCalendarEventResponseMessage)
      .pipe(
        tap((message: ResponseMessage) => {
          this.form.reset();
          setTimeout(() => this._store.dispatch(setCreateCalendarEventResponseMessage({ message: null })), 3000);
          this._setFocusToTitleInput();
        })
      );
    
    this.form = this._formBuilder.group({
      title: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._setFocusToTitleInput();
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
      title: value.title,
      location: value.location,
      description: value.description,
      startDateTime: startDateTime,
      endDateTime: endDateTime
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

  private _setFocusToTitleInput(): void {
    this._renderer.selectRootElement('#title').focus();
  }
}
