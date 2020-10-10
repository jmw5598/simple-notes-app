import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from '@sn/core/models';

@Component({
  selector: 'sn-calendar-event-update',
  templateUrl: './calendar-event-update.component.html',
  styleUrls: ['./calendar-event-update.component.scss']
})
export class CalendarEventUpdateComponent implements OnInit {
  @Input()
  public event: CalendarEvent;

  constructor() { }

  ngOnInit(): void {
  }
}
