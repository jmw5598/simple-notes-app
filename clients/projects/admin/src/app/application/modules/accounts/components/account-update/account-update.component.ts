import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { IAccountsState } from '../../store/reducers';
import { buildAccountFormGroup, buildAddressFormGroup, buildProfileFormGroup, buildUserFormGroup } from '@sn/admin/shared/forms';

import { DrawerService } from '@sn/shared/components';
import { AccountValidators } from '@sn/core/services';
import { Account, Plan, ResponseMessage, Role } from '@sn/shared/models';
import { take, takeUntil, withLatestFrom } from 'rxjs/operators';

import * as accountsSelectors from '../../store/selectors';
import * as accountsActions from '../../store/actions';
import * as plansSelectors from '@sn/admin/core/store/selectors/plans.selectors';
import * as rolesSelectors from '@sn/admin/core/store/selectors/roles.selectors';

@Component({
  selector: 'sn-admin-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountUpdateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();

  public responseMessage$: Observable<ResponseMessage>;
  public plans$: Observable<Plan[]>;
  public roles$: Observable<Role[]>;
  public form: FormGroup;
  public account: Account;

  constructor(
    private _store: Store<IAccountsState>,
    private _formBuilder: FormBuilder,
    private _drawerService: DrawerService,
    private _accountValidators: AccountValidators,
    private _changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._selectState();
    this._initializeForm();
    this._listenForDrawerDataChanges();
    this._listenForRolesChanges();
  }

  public submit(formValue: any): void {
    console.log("form value is ", formValue);
  }

  public close(): void {
    this._drawerService.close();
  }

  private _selectState(): void {
    this.responseMessage$ = this._store.select(accountsSelectors.selectUpdateAccountResponseMessage);
    this.plans$ = this._store.select(plansSelectors.selectPlans);
    this.roles$ = this._store.select(rolesSelectors.selectActiveRoles);
  }

  private _initializeForm(): void {
    this.form = this._formBuilder.group({
      account: buildAccountFormGroup(this._formBuilder, this._accountValidators),
      profile: buildProfileFormGroup(this._formBuilder, this._accountValidators),
      user: buildUserFormGroup(this._formBuilder, this._accountValidators)
    });
  }

  private _listenForDrawerDataChanges(): void {
    this._drawerService.onDataChange()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(data => {
        if (data) {
          this.account = data as Account;
          this.form.patchValue({...data});
        }
      });
  }

  private _listenForRolesChanges(): void {
    this.roles$
      .pipe(
        takeUntil(this._subscriptionSubject),
        withLatestFrom(this._drawerService.onDataChange())
      )
      .subscribe(([roles, account]) => {
        setTimeout(() => {
          this._patchCurrentRolesToForm(
            account?.user?.roles || [], 
            this.form.get('user')?.get('roles') as FormArray
          );
        });
      });
  }

  private _patchCurrentRolesToForm(roles: Role[], rolesFormArray: FormArray): void {
    rolesFormArray.controls.forEach(control => {
      const shouldRoleBeChecked: Role = roles.find(role => role.id === control?.value?.id);
      if (!shouldRoleBeChecked) return;
      control.get('isChecked').patchValue(true);
      this._changeDetector.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
