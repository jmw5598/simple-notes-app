import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@env/environment';
import { take } from 'rxjs/operators';
import { AuthenticatedUser, UserCredentials, UserDetails } from '../models';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  const AUTH_USER_KEY: string = "AUTHUSER";
  const REMEMBER_ME_KEY: string = "REMEMBERME";

  const credentialsMock: UserCredentials = {
    username: 'username',
    password: 'password',
    rememberMe: false
  } as UserCredentials;

  const userDetailsMock: UserDetails = {
    id: 1,
    roles: ['USER', 'ADMIN'],
    username: 'username'
  } as UserDetails;

  const authenticatedUserMock: AuthenticatedUser = {
    accessToken : 'access-token',
    refreshToken: 'refresh-token',
    expiresIn: '123456',
    prefix: 'Bearer',
    userDetails: userDetailsMock
  } as AuthenticatedUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(REMEMBER_ME_KEY);
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call POST request to authenticate user with supplied UserCredenticals when authenticateUser is called and store user in localStorage', (done) => {
    const requestUrl: string = `${environment.auth.baseUrl}/login`;
    service.authenticateUser(credentialsMock)
      .pipe(take(1))
      .subscribe(authenticatedUser => {
        expect(authenticatedUser).toEqual(authenticatedUserMock);
        expect(localStorage.getItem(AUTH_USER_KEY)).toBeTruthy();
        expect(localStorage.getItem(REMEMBER_ME_KEY)).toBeFalsy();
        done();
      });
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(credentialsMock);
    httpRequest.flush(authenticatedUserMock);
  });

  it('should call POST request to authenticate user with supplied UserCredenticals when authenticateUser is called and store user in localStorage with rememberMe', (done) => {
    const requestUrl: string = `${environment.auth.baseUrl}/login`;
    const rememberMeCredentials = { ...credentialsMock, rememberMe: true }
    service.authenticateUser(rememberMeCredentials)
      .pipe(take(1))
      .subscribe(authenticatedUser => {
        expect(authenticatedUser).toEqual(authenticatedUserMock);
        expect(localStorage.getItem(AUTH_USER_KEY)).toBeTruthy();
        expect(localStorage.getItem(REMEMBER_ME_KEY)).toBeTruthy();
        done();
      });
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(rememberMeCredentials);
    httpRequest.flush(authenticatedUserMock);
  });

  it('should call POST request to refresh access token when refreshToken is called', (done) => {
    const requestUrl: string = `${environment.auth.baseUrl}/token`;
    service.refreshToken(authenticatedUserMock.accessToken, authenticatedUserMock.refreshToken)
      .pipe(take(1))
      .subscribe(authenticatedUser => {
        expect(authenticatedUser).toEqual(authenticatedUserMock);
        done();
      });
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual({
      accessToken: authenticatedUserMock.accessToken,
      refreshToken: authenticatedUserMock.refreshToken
    });
    httpRequest.flush(authenticatedUserMock);
  });

  it('should remove logged in user from localStorage when logoutUser is called', (done) => {
    const requestUrl: string = `${environment.auth.baseUrl}/login`;
    service.authenticateUser(credentialsMock)
      .pipe(take(1))
      .subscribe(authenticatedUser => {
        expect(localStorage.getItem(AUTH_USER_KEY)).toBeTruthy();
        service.logoutUser();
        expect(localStorage.getItem(AUTH_USER_KEY)).toBeFalsy();
        done();
      });
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(credentialsMock);
    httpRequest.flush(authenticatedUserMock);
  });

  it('should return authenticated user from localStorage when getStoredAuthenticatedUser is called', (done) => {
    const requestUrl: string = `${environment.auth.baseUrl}/login`;
    service.authenticateUser(credentialsMock)
      .pipe(take(1))
      .subscribe(authenticatedUser => {
        const localStorageAuthenticatedUser = JSON.parse(localStorage.getItem(AUTH_USER_KEY));
        const storedAuthenticatedUser = service.getStoredAuthenticatedUser();
        expect(localStorageAuthenticatedUser).toEqual(storedAuthenticatedUser);
        done();
      });
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(credentialsMock);
    httpRequest.flush(authenticatedUserMock);
  });

 it('should return remember me from localStorage when getStoredRememberMe is called', (done) => {
    const requestUrl: string = `${environment.auth.baseUrl}/login`;
    service.authenticateUser(credentialsMock)
      .pipe(take(1))
      .subscribe(authenticatedUser => {
        const localStorageRememberMe = JSON.parse(localStorage.getItem(REMEMBER_ME_KEY));
        const rememberMe = service.getStoredRememberMe();
        expect(localStorageRememberMe).toEqual(rememberMe);
        done();
      });
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(credentialsMock);
    httpRequest.flush(authenticatedUserMock);
  });
});
