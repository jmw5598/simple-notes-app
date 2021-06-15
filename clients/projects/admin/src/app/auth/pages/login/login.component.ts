import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '@sn/core/services';
import { fadeAnimation } from '@sn/shared/animations';
import { AuthenticatedStatus, UserCredentials } from '@sn/shared/models';
import { Observable, Subscription } from 'rxjs';

import * as fromAuth from '../../store/reducers';
import * as fromActions from '../../store/actions';
import * as fromSelectors  from '../../store/selectors';
import { Roles } from 'projects/@sn/shared/models/src/public-api';

@Component({
  selector: 'sn-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation]
})
export class LoginComponent implements OnInit {
  private _authenticationStateSubscription: Subscription;
  public authenticationState: fromAuth.IAuthenticationState;
  public form: FormGroup;
  public queryParamMessage$: Observable<string>;

  constructor(
    private _authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder,
    private _store: Store<fromAuth.IAuthenticationState>,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.form = this._formBuilder.group({
      username: ['demo', [Validators.required]],
      password: ['demo', [Validators.required]],
      rememberMe: [false, [Validators.required]],
      requestedRole: [Roles.ADMIN, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this._authenticationStateSubscription = this._store.select(fromSelectors.selectAuthenticationState)
      .subscribe(state => {
        this.authenticationState = state;
        if(state.authenticatedStatus === AuthenticatedStatus.AUTHENTICATED) {
          this._router.navigate(['/auth', 'logging-in']);
        }
      });
      
    this.queryParamMessage$ = this._route.queryParams.pipe(
      map(params => params['message'])
    );
    
    const rememberMe: UserCredentials = this._authenticationService.getStoredRememberMe();
    if (rememberMe) this.form.patchValue(rememberMe);
  }

  public submitForm(form: any): void {
    const user: UserCredentials = ({ 
      username: form.username, 
      password: form.password,
      rememberMe: form.rememberMe,
      requestedRole: form.requestedRole
    }) as UserCredentials;
    this._store.dispatch(fromActions.loginUser({ credentials: user }));
  }
}
