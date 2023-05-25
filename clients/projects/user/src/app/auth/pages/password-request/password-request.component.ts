import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap, distinctUntilChanged } from 'rxjs/operators';

import * as fromAuth from '../../store/reducers';
import * as fromActions from '../../store/actions';
import * as fromSelectors from '../../store/selectors';

import { PasswordRequestReset, ResponseMessage } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';

@Component({
  selector: 'sn-user-password-request',
  templateUrl: './password-request.component.html',
  styleUrls: ['./password-request.component.scss'],
  animations: [fadeAnimation]
})
export class PasswordRequestComponent implements OnInit, OnDestroy {
  public form: UntypedFormGroup;
  public passwordRequestResetResult: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _store: Store<fromAuth.IAuthenticationState>
  ) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.passwordRequestResetResult = this._store.select(fromSelectors.selectPasswordRequestResult)
      .pipe(
        filter(result => result !== null),
        distinctUntilChanged(),
        tap(() => this.form.reset())
      );
  }

  public onSubmit(passwordRequest: PasswordRequestReset): void {
    this._store.dispatch(fromActions.passwordRequestReset({ request: passwordRequest }));
  }

  ngOnDestroy(): void {
     this._store.dispatch(fromActions.passwordRequestResetResult({ result: null }))
  }
}
