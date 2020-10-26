import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap, distinctUntilChanged } from 'rxjs/operators';

import { PasswordRequestReset, ResponseMessage } from '@sn/core/models';
import { passwordRequestReset, passwordRequestResetResult } from '@sn/core/store/actions';
import { IAppState } from '@sn/core/store/state'
import { fadeAnimation } from '@sn/shared/animations';
import { selectPasswordRequestResult } from '@sn/core/store/selectors';

@Component({
  selector: 'sn-password-request',
  templateUrl: './password-request.component.html',
  styleUrls: ['./password-request.component.scss'],
  animations: [fadeAnimation]
})
export class PasswordRequestComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public passwordRequestResetResult: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>
  ) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.passwordRequestResetResult = this._store.select(selectPasswordRequestResult)
      .pipe(
        filter(result => result !== null),
        distinctUntilChanged(),
        tap(() => this.form.reset())
      );
  }

  public onSubmit(passwordRequest: PasswordRequestReset): void {
    this._store.dispatch(passwordRequestReset({ request: passwordRequest }));
  }

  ngOnDestroy(): void {
     this._store.dispatch(passwordRequestResetResult({ result: null }))
  }
}
