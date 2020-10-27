import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarIntegrationState, IntegrationStatus } from 'src/app/core/models';

@Component({
  selector: 'sn-calendar-integration',
  templateUrl: './calendar-integration.component.html',
  styleUrls: ['./calendar-integration.component.scss']
})
export class CalendarIntegrationComponent implements OnInit {
  @Input()
  public integration: CalendarIntegrationState;

  @Output()
  public onActivateIntegration: EventEmitter<CalendarIntegrationState>;

  @Output()
  public onInactivateIntegration: EventEmitter<CalendarIntegrationState>;

  @Output()
  public onRefreshIntegration: EventEmitter<CalendarIntegrationState>;

  public IntegrationStatus = IntegrationStatus;

  constructor() {
    this.onActivateIntegration = new EventEmitter<CalendarIntegrationState>();
    this.onInactivateIntegration = new EventEmitter<CalendarIntegrationState>();
    this.onRefreshIntegration = new EventEmitter<CalendarIntegrationState>();
  }

  ngOnInit(): void {
  }
}
