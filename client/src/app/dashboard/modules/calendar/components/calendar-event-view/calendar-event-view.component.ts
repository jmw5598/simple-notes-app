import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { DrawerService } from '@sn/shared/components';
import { tap } from 'rxjs/operators';
import { deleteCalendarEvent } from '@sn/core/store/actions';
import { CalendarEvent } from '@sn/core/models';
import { buildCalendarEventFormGroup } from '../calendar-event-form/calendar-event-form.builder';

@Component({
  selector: 'sn-calendar-event-view',
  templateUrl: './calendar-event-view.component.html',
  styleUrls: ['./calendar-event-view.component.scss']
})
export class CalendarEventViewComponent implements OnInit {
  public form: FormGroup;
  public data$: Observable<CalendarEvent>;
  public data: any;
  public calendarEventView: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _drawerService: DrawerService, 
    private _store: Store<IAppState>
  ) {
    this.calendarEventView = 'display';
    this.form = buildCalendarEventFormGroup(this._formBuilder);
  }

  ngOnInit(): void {
    // TODO make subscription subject  since async pipe wont be use in template or maybe it will?
    this.data$ = this._drawerService.onDataChange()
      .pipe(tap(
        data => this.data = data
      ));
  }

  public onEdit(): void {
    if (this.calendarEventView.toLowerCase() === 'display') {
      this.calendarEventView = 'edit';
    } else {
      this.calendarEventView = 'display';
    }
  }

  public onDelete(): void {
    this._store.dispatch(deleteCalendarEvent({ id: this.data.id || -1 }))
    this._drawerService.close();  // TODO Select delete response message and close if successful!
  }

  public onUpdate(value: any): void {
    console.log("updating aclendar evetn: ", value);
  }
}
