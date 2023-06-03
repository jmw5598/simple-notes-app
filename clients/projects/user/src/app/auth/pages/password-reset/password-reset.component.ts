import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap, filter } from 'rxjs/operators';

import { PasswordReset, ResponseMessage } from '@sn/shared/models';
import { MatchValidators } from '@sn/core/services';
import { fadeAnimation } from '@sn/shared/animations';

import * as fromAuth from '../../store/reducers';
import * as fromActions from '../../store/actions';
import * as fromSelectors from '../../store/selectors';

@Component({
  selector: 'sn-user-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class PasswordResetComponent implements OnInit {
  public form: UntypedFormGroup;
  public passwordResetResult$: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _store: Store<fromAuth.IAuthenticationState>,
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
    this.passwordResetResult$ = this._store.select(fromSelectors.selectPasswordResetResult).pipe(
      filter(result => result !== null),
      tap(result => {
        this.form.reset();
        setTimeout(() => {
          this._store.dispatch(fromActions.passwordResetResult(null));
          this._router.navigate(['/auth', 'login']);
        }, 5000)
      })   
    );

    this._route.queryParams
      .pipe(take(1))
      .subscribe(params => this.form.patchValue({ code: params['code'] }))
  }

  public onSubmit(resetValues: PasswordReset): void {
    this._store.dispatch(fromActions.passwordReset({ request: resetValues }));
  }
}
