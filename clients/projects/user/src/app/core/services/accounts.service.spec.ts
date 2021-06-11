import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '@sn/user/env/environment';
import { take } from 'rxjs/operators';

import { Account, Address, PasswordRequestReset, PasswordReset, Plan, Profile } from '@sn/user/core/models';
import { AccountsService } from './accounts.service';
import { Registration, RegistrationUser } from '../dtos';

describe('AccountsService', () => {
  let service: AccountsService;
  let httpMock: HttpTestingController;

  const accountMock: Account = {
    id: 1,
    plan: { id: 1, name: 'Free' } as Plan
  } as Account;

  const profileMock: Profile = {
    id: 1,
    address: { id: 1, street: '1234 Main', city: 'City', state: 'MI' } as Address,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@johndoe.com'
  } as Profile;

  const userMock: RegistrationUser = {
    username: 'username',
    password: 'password',
    passwordConfirm: 'password'
  } as RegistrationUser; 

  const registrationMock: Registration = {
    account: accountMock,
    profile: profileMock,
    user: userMock
  } as Registration;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AccountsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make POST request to save account when save is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts`;
    service.save(accountMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(accountMock);
  });

  it('should make PUT request to update account when update is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/${accountMock.id}`;
    service.update(accountMock.id, accountMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('PUT');
    expect(httpRequest.request.body).toEqual(accountMock);
  });

  it('should make a DELETE request to delete account when delete is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/${accountMock.id}`;
    service.delete(accountMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('DELETE');
  });

  it('should make a GET request to find and account by its id when findOne is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/${accountMock.id}`;
    service.findOne(accountMock.id)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
    expect(httpRequest.request.urlWithParams).toContain(accountMock.id.toString());
  });

  it('should make a GET request to find all accounts when findAll is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts`;
    service.findAll()
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });

  it('should make GET request when getAccountDetails is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/details`;
    service.getAccountDetails()
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });

  it('should make PUT request to update account when updateAccountDetails is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/details`;
    service.updateAccountDetails(accountMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('PUT');
    expect(httpRequest.request.body).toEqual(accountMock);
  });

  it('should make GET requst to get account profile when getAccountProfile is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/profile`;
    service.getAccountProfile()
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('GET');
  });

  it('should make PUT request to update account profile when updateAccountProfile is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/profile`;
    service.updateAccountProfile(profileMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('PUT');
    expect(httpRequest.request.body).toEqual(profileMock);
  });

  it('should make POST request to register new account when registerNewAccount is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/register`;
    service.registerNewAccount(registrationMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(registrationMock);
  });

  it('should  make HEAD request to validate that email is available when validateEmail is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/validate/email?email=${profileMock.email}`;
    service.validateEmail(profileMock.email)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('HEAD');
    expect(httpRequest.request.urlWithParams).toContain(`email=${profileMock.email}`);
  });

  it('should make HEAD request to validate that username is available when validateUsername is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/validate/username?username=${userMock.username}`;
    service.validateUsername(userMock.username)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('HEAD');
    expect(httpRequest.request.urlWithParams).toContain(`username=${userMock.username}`);
  });

  it('should make POST request to request a password reset when passwordRequestReset is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/password-request`;
    const passwordRequestMock: PasswordRequestReset = {
      email: 'johndoe@johndoe.com'
    } as PasswordRequestReset;
    service.passwordRequestReset(passwordRequestMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(passwordRequestMock);
  });

  it('should make POST request to reset passwrod when passwordReset is called', () => {
    const requestUrl: string = `${environment.api.baseUrl}/accounts/password-reset`;
    const passwordResetMock: PasswordReset = {
      password: 'password',
      passwordConfirm: 'password',
      resetToken: 'reset-token-123'
    } as PasswordReset;
    service.passwordReset(passwordResetMock)
      .pipe(take(1))
      .subscribe();
    const httpRequest = httpMock.expectOne(requestUrl);
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.body).toEqual(passwordResetMock);
  });
});
