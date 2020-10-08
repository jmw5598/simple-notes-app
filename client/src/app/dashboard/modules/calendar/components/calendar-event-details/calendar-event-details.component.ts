import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DrawerService } from '@sn/shared/components';

@Component({
  selector: 'sn-calendar-event-details',
  templateUrl: './calendar-event-details.component.html',
  styleUrls: ['./calendar-event-details.component.scss']
})
export class CalendarEventDetailsComponent implements OnInit {
  public data$: Observable<any>;

  constructor(private _drawerService: DrawerService) { }

  ngOnInit(): void {
    this.data$ = this._drawerService.onDataChange();
  }

  public onClose(): void {
    this._drawerService.close();
  }
}
