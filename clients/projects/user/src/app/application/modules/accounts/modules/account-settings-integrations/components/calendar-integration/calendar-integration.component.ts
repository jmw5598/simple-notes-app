import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarIntegration, CalendarIntegrationState, IntegrationStatus } from '@sn/user/core/models';
import { CalendarIntegrationType } from '@sn/user/core/models';

@Component({
  selector: 'sn-user-calendar-integration',
  templateUrl: './calendar-integration.component.html',
  styleUrls: ['./calendar-integration.component.scss']
})
export class CalendarIntegrationComponent implements OnInit {
  @Input()
  public integration: CalendarIntegrationType;

  @Output()
  public onActivateIntegration: EventEmitter<CalendarIntegration>;

  @Output()
  public onInactivateIntegration: EventEmitter<CalendarIntegration>;

  @Output()
  public onRefreshIntegration: EventEmitter<CalendarIntegration>;

  public IntegrationStatus = IntegrationStatus;

  constructor() {
    this.onActivateIntegration = new EventEmitter<CalendarIntegration>();
    this.onInactivateIntegration = new EventEmitter<CalendarIntegration>();
    this.onRefreshIntegration = new EventEmitter<CalendarIntegration>();
  }

  ngOnInit(): void {
  }

  public activateIntegration(): void {
    // TODO
  }

  public inactivateIntegration(integration: CalendarIntegration): void {
    this.onInactivateIntegration.emit(integration);
  }

  public refreshIntegration(integration: CalendarIntegration): void {
    this.onRefreshIntegration.emit(integration);
  }

  public isTokenExpired(date: Date): boolean {
    return new Date(date) < new Date();
  }
}
