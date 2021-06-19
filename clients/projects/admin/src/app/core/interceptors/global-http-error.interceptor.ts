import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, 
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/user/store/reducers';

import * as httpActions from '../store/actions/http-error.actions';

@Injectable()
export class GlobalHttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private _store: Store<IAppState>
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status !== 401) {
            this._store.dispatch(
              httpActions.handleHttpError({
                error: error
              })
            );
          }
          return throwError(error);
        })
      );
  }
}
