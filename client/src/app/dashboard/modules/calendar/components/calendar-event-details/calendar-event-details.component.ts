import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { CalendarEvent } from '@sn/core/models';

@Component({
  selector: 'sn-calendar-event-details',
  templateUrl: './calendar-event-details.component.html',
  styleUrls: ['./calendar-event-details.component.scss']
})
export class CalendarEventDetailsComponent implements OnInit {
  @Input()
  public event: CalendarEvent;

  constructor(
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
  }
}
