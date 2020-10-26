import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '@sn/core/store/state';
import { logoutUser } from '@sn/core/store/actions';
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

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    setTimeout(() => this._store.dispatch(logoutUser()), 1000);
  }
}
