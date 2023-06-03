import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ICalendarIntegrationsState } from '../../store/reducers';
import { authorizeGoogleCalendarIntegration, inactiveCalendarIntegration, refreshCalendarIntegration } from '../../store/actions';
import { CalendarIntegration, CalendarIntegrationType, IntegrationStatus } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';
import { selectCalendarIntegrationsGroupedByType } from '../../store/selectors';

@Component({
  selector: 'sn-user-account-settings-integrations',
  templateUrl: './account-settings-integrations.component.html',
  styleUrls: ['./account-settings-integrations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class AccountSettingsIntegrationsComponent implements OnInit {
  public IntegrationStatus = IntegrationStatus;
  public calendarIntegrationsGroupedByType$: Observable<CalendarIntegrationType[]>;

  constructor(
    private _store: Store<ICalendarIntegrationsState>
  ) { }

  ngOnInit(): void {
    this.calendarIntegrationsGroupedByType$ = this._store.select(selectCalendarIntegrationsGroupedByType);
  }

  public authorizeGoogleCalendarIntegration(): void {
    this._store.dispatch(authorizeGoogleCalendarIntegration());
  }

  public onInactivateIntegration(integration: CalendarIntegration): void {
    this._store.dispatch(inactiveCalendarIntegration({ id: integration.id }));
  }

  public onRefreshIntegration(integration: CalendarIntegration): void {
    this._store.dispatch(refreshCalendarIntegration({ 
      id: integration.id, 
      integration: integration 
    }));
  }
}
