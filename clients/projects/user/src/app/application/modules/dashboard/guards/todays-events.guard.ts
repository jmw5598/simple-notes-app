import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { CalendarEvent } from '@sn/core/models';
import { OverlayLoaderService } from '@sn/shared/components';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { ICalendarEventsState } from '../../calendar/store/reducers';
import { getTodaysCalendarEvents } from '../store/actions';
import { selectTodaysEvents } from '../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class TodaysEventsGuard implements CanActivate {
  constructor(
    private _overlayLoaderService: OverlayLoaderService,
    private _store: Store<ICalendarEventsState>
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this._getTodaysEventsFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
  
  private _getTodaysEventsFromStoreOrApi(): Observable<CalendarEvent[]> {
    return this._store.select(selectTodaysEvents).pipe(
      tap((events: CalendarEvent[]) => {
        if (!events) {
          this._overlayLoaderService.setLoadingState(true);
          this._store.dispatch(getTodaysCalendarEvents());
        }
      }),
      filter((events: CalendarEvent[]) => !!events),
      take(1)
    )
  }
}
