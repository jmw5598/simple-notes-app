import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorActions } from '../actions';

@Injectable()
export class HttpErrorEffects {
  constructor(private _actions: Actions) {}

  handleHttpError$ = createEffect(() => this._actions.pipe(
    ofType(HttpErrorActions.handleHttpError),
    tap(({ error }) => {
      const httpError: HttpErrorResponse = error as HttpErrorResponse;
      this._openNewNotificationError(httpError.error.message);
    })
  ), { dispatch: false })

  private _openNewNotificationError(message: string): void {
    const notificationMessage: string = `We encounted an error trying your request; ${message}`;    
    console.log("Error: ", notificationMessage);
  }
}
