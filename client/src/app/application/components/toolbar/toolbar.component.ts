import { Component, OnInit } from '@angular/core';
import { DrawerService, DrawerLocation } from '@sn/shared/components';

import { 
  TopicCreateComponent, 
  TopicSearchComponent,
  CalendarEventCreateComponent } from '@sn/shared/components';

@Component({
  selector: 'sn-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [DrawerService]
})
export class ToolbarComponent implements OnInit {
  public DrawerLocation = DrawerLocation;

  constructor(
    private _drawerService: DrawerService
  ) { }

  ngOnInit(): void {
  }

  public onCreateNewTopic(): void {
    this._drawerService.show(TopicCreateComponent);
  }

  public onCreateNewCalendarEvent(): void {
    this._drawerService.show(CalendarEventCreateComponent, { date: new Date() });
  }

  public onPreviousRoute(): void {
    window.history.back();
  }

  public onNextRoute(): void {
    window.history.forward();
  }

  public onSearchTopics(): void {
    this._drawerService.show(TopicSearchComponent);
  }
}
