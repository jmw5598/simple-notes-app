import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from '../model/user.model';

import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthenticationService implements OnDestroy {

  private jwt: JwtHelperService;
  private _isAuthenticated: boolean = false;
  private authenticationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isAuthenticated);
  private base: string = "http://localhost:8080/";

  public authentication = this.authenticationSubject.asObservable();

  constructor(private http : HttpClient) {
    this.jwt = new JwtHelperService();
  }

  authenticate(user: User): Observable<any> {
    return this.http.post(this.base + 'auth', user)
      .map(r => this.extractData(r))
      .catch(e => this.handleError(e));
  }

  unauthenticate() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    let token = localStorage.getItem("token");
    if(!this.jwt.isTokenExpired(token)) {
      return true;
    } else if (token) {
      return false;
    }
    return false;
  }

  refreshToken(): Observable<any> {
    return this.http.get(this.base + '/refresh')
      .map(r => this.extractData(r))
      .catch(e => this.handleError(e));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private notify() {
    this.authenticationSubject.next(this._isAuthenticated);
  }

  protected extractData(res: Response | any) {
    let token = res.token;
    localStorage.setItem('token', token);
    return true;
  }

  protected handleError(error: Response | any) {
    let msg: string = error.error;
    return Observable.throw(msg);
  }

  ngOnDestroy() {
    localStorage.removeItem('token');
  }

}
