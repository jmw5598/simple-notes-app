import { Component, OnInit, Input, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, ControlContainer } from '@angular/forms';
import { CalendarEvent, ResponseMessage } from '@sn/shared/models';
import { showHide } from '@sn/shared/animations';
import { toDateTimePickerFormat } from '@sn/user/shared/utils';

@Component({
  selector: 'sn-user-calendar-event-update',
  templateUrl: './calendar-event-update.component.html',
  styleUrls: ['./calendar-event-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHide]
})
export class CalendarEventUpdateComponent implements OnInit, AfterViewInit {
  @Input()
  public event: CalendarEvent;

  @Input()
  public responseMessage: ResponseMessage;

  public form: UntypedFormGroup;

  constructor(
    private _parentControl: ControlContainer,
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as UntypedFormGroup;
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.form && this.event) {
        const formValue: {[key: string]: any} = {
          ...this.event,
          startDate: toDateTimePickerFormat(new Date(this.event.startDateTime)), 
          endDate: toDateTimePickerFormat(new Date(this.event.endDateTime))
        }
        this.form.patchValue(formValue);
      }
    })
  }
}
