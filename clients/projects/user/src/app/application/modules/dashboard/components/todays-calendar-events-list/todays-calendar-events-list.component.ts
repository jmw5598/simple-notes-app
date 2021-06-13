import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from '@sn/shared/models';

@Component({
  selector: 'sn-user-todays-calendar-events-list',
  templateUrl: './todays-calendar-events-list.component.html',
  styleUrls: ['./todays-calendar-events-list.component.scss']
})
export class TodaysCalendarEventsListComponent implements OnInit {
  @Input()
  public events: CalendarEvent[];

  constructor() { }

  ngOnInit(): void {
  }
}
