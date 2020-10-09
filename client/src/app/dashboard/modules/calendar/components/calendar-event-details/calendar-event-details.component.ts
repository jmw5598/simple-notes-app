import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { tap } from 'rxjs/operators';
import { DrawerService } from '@sn/shared/components';
import { deleteCalendarEvent } from '@sn/core/store/actions';

@Component({
  selector: 'sn-calendar-event-details',
  templateUrl: './calendar-event-details.component.html',
  styleUrls: ['./calendar-event-details.component.scss']
})
export class CalendarEventDetailsComponent implements OnInit {
  public data$: Observable<any>;
  public data: any;

  constructor(
    private _drawerService: DrawerService, 
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    // TODO make subscription subject  since async pipe wont be use in template or maybe it will?
    this.data$ = this._drawerService.onDataChange()
      .pipe(tap(
        data => this.data = data
      ));
  }

  public onEdit(): void {
    this._drawerService.close();
  }

  public onDelete(): void {
    this._store.dispatch(deleteCalendarEvent({ id: this.data.id || -1 }))
    this._drawerService.close();  // TODO Select delete response message and close if successful!
  }
}
