import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAuth from '../../store/reducers';
import * as fromActions from '../../store/actions';

@Component({
  selector: 'sn-admin-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent implements OnInit {
  constructor(private _store: Store<fromAuth.IAuthenticationState>) { }

  ngOnInit(): void {
    setTimeout(() => this._store.dispatch(fromActions.logoutUser()), 1000);
  }
}
