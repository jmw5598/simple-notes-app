import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IRolesState } from '@sn/admin/core/store/reducers';
import { ResponseMessage, Role } from '@sn/shared/models';
import { Observable } from 'rxjs';

import * as rolesSelectors from '@sn/admin/core/store/selectors';
import * as rolesActions from '@sn/admin/core/store/actions';
import { buildRolesForm } from '../roles-form/roles-form.builder';
import { showHide } from '@sn/shared/animations';
import { tap } from 'rxjs/operators';
import { SnDrawerService } from '@sn/drawer';

@Component({
  selector: 'sn-admin-roles-create',
  templateUrl: './roles-create.component.html',
  styleUrls: ['./roles-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHide]
})
export class RolesCreateComponent implements OnInit {
  public form: UntypedFormGroup;
  public responseMessage$: Observable<ResponseMessage>;

  constructor(
    private _store: Store<IRolesState>,
    private _drawerService: SnDrawerService,
    private _formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this._selectState();
    this._initializeForm();
  }

  private _initializeForm(): void {
    this.form = buildRolesForm(this._formBuilder);
  }

  public submit(role: Role): void {
    this._store.dispatch(rolesActions.createRole({
      role: role
    }));
  }

  public close(): void {
    this._drawerService.close();
  }

  private _selectState(): void {
    this.responseMessage$ = this._store.select(rolesSelectors.selectCreateRoleResponseMessasge)
      .pipe(tap(message => {
        if (message) {
          setTimeout(() => this._store.dispatch(rolesActions.setCreateRoleResponseMessage({ message: null })), 3000);
        }
      }));
  }
}
