import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { Store } from '@ngrx/store';

import { AuthenticationService } from '@sn/core/services';
import { fadeAnimation } from '@sn/shared/animations';
import { AuthenticatedStatus, UserCredentials } from '@sn/shared/models';
import { Roles } from '@sn/shared/models';
import { SnAlertModule } from '@sn/alert';
import { SnCheckboxModule } from '@sn/checkbox';
import { SnButtonsModule } from '@sn/button';
import { SnLinkModule } from '@sn/link';

import { IAuthenticationState, AuthenticationActions, AuthenticationSelectors } from '../../store';

@Component({
  selector: 'sn-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation],
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    SnAlertModule,
    SnButtonsModule,
    SnCheckboxModule,
    SnLinkModule,
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  public hostClasses: string = 'block w-2/5';

  private _destroy$: Subject<void> = new Subject<void>();
  public authenticationState$: Observable<IAuthenticationState>;
  public form: UntypedFormGroup;
  public queryParamMessage$: Observable<string>;

  constructor(
    private _authenticationService: AuthenticationService,
    private _formBuilder: UntypedFormBuilder,
    private _store: Store,
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
    this.authenticationState$ = this._store.select(AuthenticationSelectors.selectAuthenticationState)
      .pipe(
        tap(state => {
          if(state.authenticatedStatus === AuthenticatedStatus.AUTHENTICATED) {
            this._router.navigate(['/auth', 'logging-in']);
          }
        }),
        takeUntil(this._destroy$)  
      );
      
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
    this._store.dispatch(AuthenticationActions.loginUser({ credentials: user }));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
