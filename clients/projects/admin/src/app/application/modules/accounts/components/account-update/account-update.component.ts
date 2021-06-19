import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { IAccountsState } from '../../store/reducers';
import * as accountsSelectors from '../../store/selectors';
import * as accountsActions from '../../store/actions';
import * as plansSelectors from '@sn/admin/core/store/selectors';
import { buildAccountFormGroup, buildAddressFormGroup, buildProfileFormGroup, buildUserFormGroup } from '@sn/admin/shared/forms';

import { DrawerService } from '@sn/shared/components';
import { AccountValidators } from '@sn/core/services';
import { Account, Plan, ResponseMessage } from '@sn/shared/models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sn-admin-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss']
})
export class AccountUpdateComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void> = new Subject<void>();

  public responseMessage$: Observable<ResponseMessage>;
  public plans$: Observable<Plan[]>;
  public form: FormGroup;
  public account: Account;

  constructor(
    private _store: Store<IAccountsState>,
    private _formBuilder: FormBuilder,
    private _drawerService: DrawerService,
    private _accountValidators: AccountValidators
  ) { }

  ngOnInit(): void {
    this._selectState();
    this._initializeForm();
    this._listenForDrawerDataChanges();
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

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
