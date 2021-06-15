import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromAuth from '../../store/reducers';
import * as fromActions from '../../store/actions';
import * as fromSelectors from '../../store/selectors';

import { fadeAnimation } from '@sn/shared/animations';
import { AuthenticationService } from '@sn/core/services';
import { AuthenticatedStatus, UserCredentials, Roles } from '@sn/shared/models';

@Component({
  selector: 'sn-user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation]
})
export class LoginComponent implements OnInit, OnDestroy {
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
      requestedRole: [Roles.USER, [Validators.required]]
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

  ngOnDestroy() {
    if (this._authenticationStateSubscription)
      this._authenticationStateSubscription.unsubscribe();
  }
}
