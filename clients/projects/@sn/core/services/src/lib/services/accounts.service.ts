import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AbstractCrudService } from './abstract-crud.service';
import {
  Account,
  Profile,
  PasswordRequestReset, 
  PasswordReset,
  Registration,
  RegistrationResult, 
  ResponseMessage,
  ValidatorResult, 
  IPageable, Page } from '@sn/shared/models';

import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from '../core-services-configuration.model';

@Injectable()
export class AccountsService extends AbstractCrudService<Account, number> {
  constructor(
    @Inject(CORE_SERVICES_CONFIGURATION)
    protected _configuration: CoreServicesConfiguration,
    protected _http: HttpClient
  ) { 
    super(_http, `${_configuration.api.baseUrl}/accounts`);
  }

  public searchAccounts(searchTerm: string, page?: IPageable): Observable<Page<Account>> {
    const params: {[key: string]: any} = !page ? { searchTerm: searchTerm } : {
      searchTerm: searchTerm,
      page: page.page,
      size: page.size,
      sortCol: page.sort.column,
      sortDir: page.sort.direction
    };
    return this._http.get<Page<Account>>(`${this._base}/search`, { params: params });
  }

  public getAccountDetails(): Observable<Account> {
    return this._http.get<Account>(`${this._base}/details`);
  }

  public updateAccountDetails(details: Account): Observable<Account> {
    return this._http.put<Account>(`${this._base}/details`, details);
  } 

  public getAccountProfile(): Observable<Profile> {
    return this._http.get<Profile>(`${this._base}/profile`);
  }
  
  public updateAccountProfile(profile: Profile): Observable<Profile> {
    return this._http.put<Profile>(`${this._base}/profile`, profile);
  }

  public registerNewAccount(
      registration: Registration): Observable<RegistrationResult> {
    return this._http.post<RegistrationResult>(`${this._base}/register`, registration);
  }

  public validateEmail(email: string): Observable<ValidatorResult> {
    return this._http.head<ValidatorResult>(`${this._base}/validate/email`, { params: { email: email }})
      .pipe(
        switchMap(() => of({ isValid: false } as ValidatorResult))
      );
  }

  public validateUsername(username: string): Observable<ValidatorResult> {
    return this._http.head<ValidatorResult>(`${this._base}/validate/username`, { params: { username: username }})
      .pipe(
        switchMap(() => of({ isValid: false } as ValidatorResult))
      );
  }

  public passwordRequestReset(request: PasswordRequestReset): Observable<ResponseMessage> {
    return this._http.post<ResponseMessage>(`${this._base}/password-request`, request);
  }

  public passwordReset(resetRequest: PasswordReset): Observable<ResponseMessage> {
    return this._http.post<ResponseMessage>(`${this._base}/password-reset`, resetRequest);    
  }
}
