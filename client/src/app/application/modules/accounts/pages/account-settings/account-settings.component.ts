import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from '@sn/shared/animations'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAccountsState } from '../../store/reducers';
import { Account, Profile } from '@sn/core/models';
import { selectAccountDetails, selectAccountProfile } from '../../store/selectors';

@Component({
  selector: 'sn-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
  animations: [fadeAnimation]
})
export class AccountSettingsComponent implements OnInit {
  public accountProfile$: Observable<Profile>;
  public accountDetails$: Observable<Account>;

  constructor(
    private _router: Router,
    private _store: Store<IAccountsState>
  ) { }

  ngOnInit(): void {
    this.accountProfile$ = this._store.select(selectAccountProfile);
    this.accountDetails$ = this._store.select(selectAccountDetails);
  }

  public navigateTo(route: string): void {
    this._router.navigateByUrl(`/accounts/settings/${route}`);
  }
}
