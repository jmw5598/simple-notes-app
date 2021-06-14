import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { fadeAnimation } from '@sn/shared/animations';
import { UserCredentials } from '@sn/shared/models';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'sn-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation]
})
export class LoginComponent implements OnInit {
  private _authenticationStateSubscription: Subscription;
  public authenticationState: any; //fromAuth.IAuthenticationState;
  public form: FormGroup;
  public queryParamMessage$: Observable<string>;

  constructor(
    // private _authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder,
    // private _store: Store<fromAuth.IAuthenticationState>,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.form = this._formBuilder.group({
      username: ['demo', [Validators.required]],
      password: ['demo', [Validators.required]],
      rememberMe: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public submitForm(form: any): void {
    const user: UserCredentials = ({ 
      username: form.username, 
      password: form.password,
      rememberMe: form.rememberMe
    }) as UserCredentials;
    // this._store.dispatch(fromActions.loginUser({ credentials: user }));
  }
}
