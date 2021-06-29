import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Role } from '@sn/shared/models';
import { IAppState } from '@sn/user/store/reducers';
import { Observable } from 'rxjs';

import * as rolesSelectors from '@sn/admin/core/store/selectors';

@Component({
  selector: 'sn-admin-settings-roles',
  templateUrl: './settings-roles.component.html',
  styleUrls: ['./settings-roles.component.scss']
})
export class SettingsRolesComponent implements OnInit {
  public allRoles$: Observable<Role[]>;

  constructor(
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.allRoles$ = this._store.select(rolesSelectors.selectRoles);
  }
}
