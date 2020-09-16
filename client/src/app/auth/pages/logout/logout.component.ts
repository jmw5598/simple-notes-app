import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '@sn/core/store/state';
import { logoutUser } from '@sn/core/store/actions';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'inv-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  animations: [fadeAnimation]
})
export class LogoutComponent implements OnInit {
  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    setTimeout(() => this._store.dispatch(logoutUser()), 2000);
  }
}
