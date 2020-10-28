import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { authorizeGoogleCalendarIntegration, inactiveCalendarIntegration } from '@sn/core/store/actions';
import { CalendarIntegration, CalendarIntegrationState, CalendarIntegrationType, IntegrationStatus } from '@sn/core/models';
import { fadeAnimation } from '@sn/shared/animations';
import { selectCalendarIntegrationsGroupedByType } from '@sn/core/store/selectors';

@Component({
  selector: 'sn-account-settings-integrations',
  templateUrl: './account-settings-integrations.component.html',
  styleUrls: ['./account-settings-integrations.component.scss'],
  animations: [fadeAnimation]
})
export class AccountSettingsIntegrationsComponent implements OnInit {
  public IntegrationStatus = IntegrationStatus;
  public calendarIntegrationsGroupedByType$: Observable<CalendarIntegrationType[]>;

  constructor(
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.calendarIntegrationsGroupedByType$ = this._store.select(selectCalendarIntegrationsGroupedByType);
  }

  public authorizeGoogleCalendarIntegration(): void {
    this._store.dispatch(authorizeGoogleCalendarIntegration());
  }

  public onInactivateIntegration(integration: CalendarIntegration): void {
    console.log("inactiating integratin...", integration);
    this._store.dispatch(inactiveCalendarIntegration({ id: integration.id }));
  }
}
