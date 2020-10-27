import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { CalendarIntegrationType } from '../models/calendar-integration-type.model';
import { IAppState } from '../store/state/app.state';
import { selectCalendarIntegrationsGroupedByType } from '../store/selectors/calendar-integration.selector';
import { getCalendarIntegrationsGroupedByType } from '../store/actions/calendar-integration.actions';

@Injectable({
  providedIn: 'root'
})
export class CalendarIntegrationsGroupedByTypeGuard implements CanActivate {
  constructor(private _store: Store<IAppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._getCalendarIntegrationTypesWithIntegrationsFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private _getCalendarIntegrationTypesWithIntegrationsFromStoreOrApi(): Observable<CalendarIntegrationType[]> {
    return this._store.select(selectCalendarIntegrationsGroupedByType).pipe(
      tap((integrations: CalendarIntegrationType[]) => {
        if (!integrations) {
          this._store.dispatch(getCalendarIntegrationsGroupedByType())
        }
      }),
      filter((integrations: CalendarIntegrationType[]) => !!integrations),
      take(1)
    ) 
  }
}
