import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import * as fromActions from '../actions';
import { ToasterService } from '@sn/user/shared/components/toaster/toaster.service';
import { ToastMessageOptions } from '@sn/user/shared/components/toaster/toast-message.model';

@Injectable()
export class HttpErrorEffects {
  constructor(
    private _actions: Actions,
    private _toasterService: ToasterService
  ) {}

  handleHttpError$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.handleHttpError),
    tap(({ error }) => {
      const httpError: HttpErrorResponse = error as HttpErrorResponse;
      this._openNewNotificationError(httpError.error.message);
    })
  ), { dispatch: false })

  private _openNewNotificationError(message: string): void {
    const notificationMessage: string = `We encounted an error trying your request; ${message}`;
    const toastMessageOptions: ToastMessageOptions = {
      type: 'danger'
    }
    this._toasterService.push(notificationMessage, toastMessageOptions);
  }
}
