import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from '@sn/core/models';

@Component({
  selector: 'sn-calendar-event-details',
  templateUrl: './calendar-event-details.component.html',
  styleUrls: ['./calendar-event-details.component.scss']
})
export class CalendarEventDetailsComponent implements OnInit {
  @Input()
  public event: CalendarEvent;

  constructor() { }

  ngOnInit(): void {
  }
}
