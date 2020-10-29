import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromState from '../../store/state';
import * as fromActions from '../../store/actions';

import { fadeAnimation } from '@sn/shared/animations';
import { SpinnerSize } from '@sn/shared/components';

@Component({
  selector: 'sn-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  animations: [fadeAnimation]
})
export class LogoutComponent implements OnInit {
  public SpinnerSize = SpinnerSize;

  constructor(private _store: Store<fromState.IAuthenticationState>) { }

  ngOnInit(): void {
    setTimeout(() => this._store.dispatch(fromActions.logoutUser()), 1000);
  }
}
