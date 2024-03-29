import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, HostBinding, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { buildUserFormGroup, buildProfileFormGroup, buildAccountFormGroup } from '@sn/user/shared/forms';

import { Registration, RegistrationResult, Plan } from '@sn/shared/models';
import { AccountValidators } from '@sn/core/services';
import { fadeAnimation } from '@sn/shared/animations';
import { RegistrationStep } from './registration-step.enum';
import { selectPlans } from '@sn/user/core/store/selectors';

import * as fromAuth from '../../store/reducers';
import * as fromActions from '../../store/actions';
import * as fromSelectors from '../../store/selectors';

@Component({
  selector: 'sn-user-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class RegisterComponent implements OnInit {
  @HostBinding('class')
  public hostClasses: string = 'block w-2/5';

  private _subscriptionSubject$: Subject<void>;
  public RegistrationStep = RegistrationStep;
  public form: UntypedFormGroup;
  public currentStep: number;
  public step: RegistrationStep;

  public registrationResult: RegistrationResult;
  public plans: Plan[];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _store: Store<fromAuth.IAuthenticationState>,
    private _formBuilder: UntypedFormBuilder,
    private _accountValidators: AccountValidators,
    private _router: Router
  ) {
    this._subscriptionSubject$ = new Subject<void>();
    this.form = this._formBuilder.group({
      user: buildUserFormGroup(
        this._formBuilder,
        this._accountValidators
      ),
      profile: buildProfileFormGroup(
        this._formBuilder,
        this._accountValidators
      ),
      account: buildAccountFormGroup(
        this._formBuilder,
        this._accountValidators
      )
    });
  }

  ngOnInit(): void {
    this.reset();
    this._store.select(fromSelectors.selectRegistrationResult)
      .pipe(takeUntil(this._subscriptionSubject$))
      .subscribe((result: RegistrationResult) => this._handleNewRegistrationResult(result))
    
    this._store.select(selectPlans)
      .pipe(takeUntil(this._subscriptionSubject$))
      .subscribe((plans: Plan[]) => this.plans = plans);
  }

  public pre(): void {
    this.currentStep -= 1;
    this.changeContent();
  }

  public next(): void {
    this.currentStep += 1;
    this.changeContent();
  }

  public reset(): void {
    this.currentStep = 0;
    this.changeContent();
  }

  public result(): void {
    this.currentStep = 3;
    this.changeContent();
  }

  public changeContent(): void {
    switch (this.currentStep) {
      case 0: {
        this.step = RegistrationStep.USER;
        break;
      }
      case 1: {
        this.step = RegistrationStep.PROFILE;
        break;
      }
      case 2: {
        this.step = RegistrationStep.ACCOUNT;
        break;
      }
      case 3: {
        this.step = RegistrationStep.FINISH;
        break;
      }
      default: {
        this.step = RegistrationStep.ERROR;
      }
    }
  }

  public onSubmit(registration: Registration): void {
    this._store.dispatch(fromActions.registerNewAccount({ registration: registration }))
  }

  private _handleNewRegistrationResult(result: RegistrationResult): void {
    if (result) {
      if (result.status.trim().toUpperCase() === 'SUCCESS') 
        this.form.reset();
      this.registrationResult = result
      this.result();
      this._store.dispatch(fromActions.registerNewAccountResult({ result: null }));
      // setTimeout(() => this._handleRedirectAfterSuccess(), 5000)
      this._changeDetectorRef.markForCheck();
    }
  }

  private _handleRedirectAfterSuccess(): void {
    this.reset();
    this._router.navigate(['/auth', 'login']);
  }

  ngOnDestroy() {
    this._subscriptionSubject$.next();
    this._subscriptionSubject$.complete();
  }
}
