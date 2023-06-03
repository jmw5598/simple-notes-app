import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IRolesState } from '@sn/admin/core/store/reducers';
import { ResponseMessage, Role } from '@sn/shared/models';
import { Observable, Subject } from 'rxjs';

import * as rolesSelectors from '@sn/admin/core/store/selectors';
import * as rolesActions from '@sn/admin/core/store/actions';
import { buildRolesForm } from '../roles-form/roles-form.builder';
import { showHide } from '@sn/shared/animations';
import { takeUntil, tap } from 'rxjs/operators';
import { DrawerService } from '@sn/shared/components';

@Component({
  selector: 'sn-admin-roles-update',
  templateUrl: './roles-update.component.html',
  styleUrls: ['./roles-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showHide]
})
export class RolesUpdateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();
  public form: UntypedFormGroup;
  public responseMessage$: Observable<ResponseMessage>;
  private _data$: Observable<Role>;

  constructor(
    private _store: Store<IRolesState>,
    private _drawerService: DrawerService,
    private _formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
     this._selectState();
     this._initializeForm();
     this._listenForDrawerDataChanges();
  }

  public close(): void {
    this._drawerService.close();
  }

  public submit(role: Role): void {
    console.log("updating role");
    this._store.dispatch(rolesActions.updateRole({
      roleId: role.id,
      role: role
    }));
  }

  private _selectState(): void {
    this.responseMessage$ = this._store.select(rolesSelectors.selectUpdateRoleResponseMessasge)
      .pipe(tap(message => {
        if (message) {
          setTimeout(() => this._store.dispatch(rolesActions.setUpdateRoleResponseMessage({ message: null })), 3000);
        }
      }));
    this._data$ = this._drawerService.onDataChange();
  }

  private _initializeForm(): void {
    this.form = buildRolesForm(this._formBuilder);
  }

  private _listenForDrawerDataChanges(): void {
    this._data$
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(data => this.form.patchValue({ ...data }));
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
