import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IDashboardState } from '../../store/reducers';
import { fadeAnimation } from '@sn/shared/animations';
import { selectRecentTopics, selectTodaysEvents } from '../../store/selectors';
import { CalendarEvent } from '@sn/core/models';
import { Topic } from '@sn/shared/models';

@Component({
  selector: 'sn-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
  animations: [fadeAnimation]
})
export class DashboardOverviewComponent implements OnInit {
  public todaysEvents$: Observable<CalendarEvent[]>;
  public recentTopics$: Observable<Topic[]>;

  constructor(private _store: Store<IDashboardState>) { }

  ngOnInit(): void {
    this.todaysEvents$ = this._store.select(selectTodaysEvents);
    this.recentTopics$ = this._store.select(selectRecentTopics);
  }
}
