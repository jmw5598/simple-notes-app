import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IDashboardState } from '../../store/reducers';
import { fadeAnimation } from '@sn/shared/animations';
import { selectPastDueTodoLists, selectRecentTopics, selectTodaysEvents, selectTodaysTodoLists } from '../../store/selectors';
import { CalendarEvent } from '@sn/shared/models';
import { TodoList, Topic } from '@sn/shared/models';
import { getPastDueTodoListsSuccess, getRecentTopicsSuccess, getTodaysCalendarEventsSuccess, getTodaysTodoListsSuccess } from '../../store/actions';

@Component({
  selector: 'sn-user-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class DashboardOverviewComponent implements OnInit, OnDestroy {
  public todaysEvents$: Observable<CalendarEvent[]>;
  public recentTopics$: Observable<Topic[]>;
  public todaysTodoLists$: Observable<TodoList[]>;
  public pastDueTodoLists$: Observable<TodoList[]>;

  constructor(
    private _store: Store<IDashboardState>
  ) { }

  ngOnInit(): void {
    this.todaysEvents$ = this._store.select(selectTodaysEvents);
    this.recentTopics$ = this._store.select(selectRecentTopics);
    this.todaysTodoLists$ = this._store.select(selectTodaysTodoLists);
    this.pastDueTodoLists$ = this._store.select(selectPastDueTodoLists);
  }

  ngOnDestroy(): void {
    this._store.dispatch(getTodaysCalendarEventsSuccess({ events: null }));
    this._store.dispatch(getRecentTopicsSuccess({ topics: null }));
    this._store.dispatch(getTodaysTodoListsSuccess({ todoLists: null }));
    this._store.dispatch(getPastDueTodoListsSuccess({ todoLists: null }));
  }
}
