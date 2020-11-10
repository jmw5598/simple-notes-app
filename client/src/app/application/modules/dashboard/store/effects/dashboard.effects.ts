import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { TopicsService, CalendarEventsService } from '@sn/core/services';
import * as fromDashboard from '../actions/dashboard.actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private _actions: Actions,
    private _topicsService: TopicsService,
    private _calendarEventsService: CalendarEventsService
  ) {}

  getRecentTopics$ = createEffect(() => this._actions.pipe(
    ofType(fromDashboard.getRecentTopics)
  ));

  getTodaysEvents$ = createEffect(() => this._actions.pipe(
    ofType(fromDashboard.getTodaysCalendarEvents)
  ));
}
