import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, ControlContainer } from '@angular/forms';
import { CalendarEvent, ResponseMessage } from '@sn/shared/models';
import { showHide } from '@sn/shared/animations';

@Component({
  selector: 'sn-user-calendar-event-update',
  templateUrl: './calendar-event-update.component.html',
  styleUrls: ['./calendar-event-update.component.scss'],
  animations: [showHide]
})
export class CalendarEventUpdateComponent implements OnInit, AfterViewInit {
  @Input()
  public event: CalendarEvent;

  @Input()
  public responseMessage: ResponseMessage;

  public form: UntypedFormGroup;

  constructor(
    private _parentControl: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = this._parentControl.control as UntypedFormGroup;
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
