import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap, filter } from 'rxjs/operators';

import { PasswordReset, ResponseMessage } from '@sn/core/models';
import { MatchValidators } from '@sn/core/validators';
import { IAppState } from '@sn/core/store/state'
import { fadeAnimation } from '@sn/shared/animations';
import { passwordReset, passwordResetResult } from '@sn/core/store/actions';
import { selectPasswordResetResult } from '@sn/core/store/selectors';

@Component({
  selector: 'sn-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  animations: [fadeAnimation]
})
export class PasswordResetComponent implements OnInit {
  public form: FormGroup;
  public passwordResetResult$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.form = this._formBuilder.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
    }, { 
      validator: MatchValidators.mustMatch('password', 'passwordConfirm')
    });
  }

  ngOnInit(): void {
    this.passwordResetResult$ = this._store.select(selectPasswordResetResult).pipe(
      filter(result => result !== null),
      tap(result => {
        this.form.reset();
        setTimeout(() => {
          this._store.dispatch(passwordResetResult(null));
          this._router.navigate(['/auth', 'login']);
        }, 5000)
      })   
    );

    this._route.queryParams
      .pipe(take(1))
      .subscribe(params => this.form.patchValue({ code: params['code'] }))
  }

  public onSubmit(resetValues: PasswordReset): void {
    this._store.dispatch(passwordReset({ request: resetValues }));
  }
}
