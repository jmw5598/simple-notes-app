import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticatedUser, UserCredentials, UserSettings } from '@sn/shared/models';
import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from '../core-services-configuration.model';

@Injectable()
export class AuthenticationService {
  private readonly AUTH_USER_KEY: string = "AUTHUSER";
  private readonly REMEMBER_ME_KEY: string = "REMEMBERME";
  private _baseUrl: string;

  constructor(
    @Inject(CORE_SERVICES_CONFIGURATION)
    private _configuration: CoreServicesConfiguration,
    private _http: HttpClient
  ) {
    this._baseUrl = this._configuration.auth.baseUrl;
  }

  public authenticateUser(credentials: UserCredentials): Observable<AuthenticatedUser> {
    return this._http.post<AuthenticatedUser>(`${this._baseUrl}/login`, credentials)
      .pipe(tap((user: AuthenticatedUser) => {
        this._handleRememberMe(credentials);
        this._handleAuthenticatedUser(user);
      }));
  }
  
  public refreshToken(accessToken: string, refreshToken: string): Observable<AuthenticatedUser> {
    return this._http.post<AuthenticatedUser>(`${this._baseUrl}/token`, {
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  }

  public logoutUser(): void {
    localStorage.removeItem(this.AUTH_USER_KEY);  
  }

  public getStoredAuthenticatedUser(): AuthenticatedUser {
    const userJson: string = localStorage.getItem(this.AUTH_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  public getStoredRememberMe(): UserCredentials {
    const credentialsJson: string = localStorage.getItem(this.REMEMBER_ME_KEY);
    return credentialsJson ? JSON.parse(credentialsJson) : null;
  }

  public setStoredUserSettings(settings: UserSettings): void {
    const authenticatedUser: AuthenticatedUser = this.getStoredAuthenticatedUser();
    if (authenticatedUser && authenticatedUser?.userDetails?.settings) {
      authenticatedUser.userDetails.settings = settings;
      localStorage.setItem(this.AUTH_USER_KEY, JSON.stringify(authenticatedUser));
    }
  }

  private _handleRememberMe(credentials: UserCredentials): void {
    if (credentials.rememberMe) {
      localStorage.setItem(this.REMEMBER_ME_KEY, JSON.stringify(credentials));
    } else {
      localStorage.removeItem(this.REMEMBER_ME_KEY);
    }
  }

  private _handleAuthenticatedUser(user: AuthenticatedUser): void {
    localStorage.setItem(this.AUTH_USER_KEY, JSON.stringify(user));
  }
}
