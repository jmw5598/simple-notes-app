import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { authorizeGoogleCalendarIntegration } from '@sn/core/store/actions';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-account-settings-integrations',
  templateUrl: './account-settings-integrations.component.html',
  styleUrls: ['./account-settings-integrations.component.scss'],
  animations: [fadeAnimation]
})
export class AccountSettingsIntegrationsComponent implements OnInit {

  constructor(
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
  }

  public authorizeGoogleCalendarIntegration(): void {
    this._store.dispatch(authorizeGoogleCalendarIntegration());
  }

}
