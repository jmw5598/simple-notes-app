import { Component, Input } from '@angular/core';
import { CalendarEvent } from '@sn/shared/models';

@Component({
  selector: 'sn-user-calendar-event-details',
  templateUrl: './calendar-event-details.component.html',
  styleUrls: ['./calendar-event-details.component.scss']
})
export class CalendarEventDetailsComponent {
  @Input()
  public event: CalendarEvent;
}
