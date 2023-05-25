import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { IAccountsState } from '@sn/admin/application/modules/accounts/store/reducers';
import { buildAccountFormGroup, buildAddressFormGroup, buildProfileFormGroup, buildUserFormGroup } from '@sn/admin/shared/forms';

import { DrawerService } from '@sn/shared/components';
import { AccountValidators } from '@sn/core/services';
import { Plan, Registration, ResponseMessage, Role } from '@sn/shared/models';
import { takeUntil } from 'rxjs/operators';

import * as accountActions from '@sn/admin/application/modules/accounts/store/actions';
import * as accountsSelectors from '@sn/admin/application/modules/accounts/store/selectors';
import * as accountsActions from '@sn/admin/application/modules/accounts/store/actions';
import * as plansSelectors from '@sn/admin/core/store/selectors/plans.selectors';
import * as rolesSelectors from '@sn/admin/core/store/selectors/roles.selectors'

@Component({
  selector: 'sn-admin-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {
  private _subscriptionSubject: Subject<void> = new Subject<void>();

  public responseMessage$: Observable<ResponseMessage>;
  public plans$: Observable<Plan[]>;
  public roles$: Observable<Role[]>;
  public form: UntypedFormGroup;

  constructor(
    private _store: Store<IAccountsState>,
    private _formBuilder: UntypedFormBuilder,
    private _drawerService: DrawerService,
    private _accountValidators: AccountValidators
  ) { }

  ngOnInit(): void {
    this._selectState();
    this._initializeForm();
  }

  public submit(registration: Registration): void {
    console.log("form value is ", registration);
    // this._store.dispatch(accountsActions.createAccount({ registration: registration }))
  }

  public close(): void {
    this._drawerService.close();
  }

  private _selectState(): void {
    this.responseMessage$ = this._store.select(accountsSelectors.selectUpdateAccountResponseMessage);
    this.plans$ = this._store.select(plansSelectors.selectPlans);
    this.roles$ = this._store.select(rolesSelectors.selectRoles);
  }

  private _initializeForm(): void {
    this.form = this._formBuilder.group({
      account: buildAccountFormGroup(this._formBuilder, this._accountValidators),
      profile: buildProfileFormGroup(this._formBuilder, this._accountValidators),
      user: buildUserFormGroup(this._formBuilder, this._accountValidators)
    });
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
