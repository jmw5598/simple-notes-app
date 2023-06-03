import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { 
  CalendarIntegration, 
  IntegrationStatus, 
  CalendarIntegrationType } from '@sn/shared/models';

@Component({
  selector: 'sn-user-calendar-integration',
  templateUrl: './calendar-integration.component.html',
  styleUrls: ['./calendar-integration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarIntegrationComponent {
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
