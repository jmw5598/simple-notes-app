import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CalendarEvent } from '@sn/shared/models';

@Component({
  selector: 'sn-user-todays-calendar-events-list',
  templateUrl: './todays-calendar-events-list.component.html',
  styleUrls: ['./todays-calendar-events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodaysCalendarEventsListComponent {
  @Input()
  public events: CalendarEvent[];
}
