import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthenticationActions,  } from '../../store';
import { AppLoadingComponent } from '../../components/app-loading/app-loading.component';

@Component({
  selector: 'sn-admin-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AppLoadingComponent,
  ]
})
export class LogoutComponent implements OnInit {
  constructor(private _store: Store) { }

  ngOnInit(): void {
    setTimeout(() => this._store.dispatch(AuthenticationActions.logoutUser()), 1000);
  }
}
