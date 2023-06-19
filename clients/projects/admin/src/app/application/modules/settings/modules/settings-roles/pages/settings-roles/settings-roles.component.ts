import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ResponseMessage, Role } from '@sn/shared/models';
import { IAppState } from '@sn/user/store/reducers';
import { Observable } from 'rxjs';

import * as rolesSelectors from '@sn/admin/core/store/selectors';
import * as rolesActions from '@sn/admin/core/store/actions';
import { SnDrawerLocation, SnDrawerService } from '@sn/drawer';
import { RolesUpdateComponent } from '../../components/roles-update/roles-update.component';
import { RolesCreateComponent } from '../../components/roles-create/roles-create.component';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-admin-settings-roles',
  templateUrl: './settings-roles.component.html',
  styleUrls: ['./settings-roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class SettingsRolesComponent implements OnInit {
  public allRoles$: Observable<Role[]>;
  public SnDrawerLocation = SnDrawerLocation;

  constructor(
    private _store: Store<IAppState>,
    private _drawerService: SnDrawerService
  ) { }

  ngOnInit(): void {
    this.allRoles$ = this._store.select(rolesSelectors.selectRoles);
  }

  public onEdit(role: Role): void {
    this._drawerService.show(RolesUpdateComponent, {
      data: role
    });
  }

  public onCreate(): void {
    this._drawerService.show(RolesCreateComponent);
  }

  public onDelete(roleId: number): void {
    this._store.dispatch(rolesActions.deleteRole({ roleId: roleId }));
  }

  public onUndelete(roleId: number): void {
    this._store.dispatch(rolesActions.undeleteRole({ roleId: roleId }));
  }
}
