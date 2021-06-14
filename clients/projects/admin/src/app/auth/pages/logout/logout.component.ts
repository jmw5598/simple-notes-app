import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-admin-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor() { }
  // constructor(private _store: Store<fromAuth.IAuthenticationState>) { }

  ngOnInit(): void {
    // setTimeout(() => this._store.dispatch(fromActions.logoutUser()), 1000);
  }
}
