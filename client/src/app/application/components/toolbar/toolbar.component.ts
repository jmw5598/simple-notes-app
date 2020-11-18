import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DrawerService, DrawerLocation } from '@sn/shared/components';
import { ShortcutInput, ShortcutEventOutput, AllowIn } from 'ng-keyboard-shortcuts';

import { 
  TopicCreateComponent, 
  TopicSearchComponent,
  CalendarEventCreateComponent } from '@sn/shared/components';
import { Topic } from '@sn/shared/models';

@Component({
  selector: 'sn-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [DrawerService]
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void>;
  public shortcuts: ShortcutInput[] = [];
  public DrawerLocation = DrawerLocation;
  private _isDrawerVisible: boolean;

  constructor(private _drawerService: DrawerService) {
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this._drawerService.onDrawerVibilityChange()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(isDrawerVisible => this._isDrawerVisible = isDrawerVisible);

    this.shortcuts.push(  
      {  
        key: "alt + c",
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input, AllowIn.Select],
        command: e => this.onCreateNewCalendarEvent()
      },
      {  
        key: "alt + t",
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input, AllowIn.Select],
        command: e => this.onCreateNewTopic()
      },
      {  
        key: "alt + s",
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input, AllowIn.Select],
        command: e => this.onSearchTopics()
      }
    );  
  }

  public onCreateNewTopic(): void {
    if (this._isDrawerVisible) {
      this._drawerService.close();
      setTimeout(() => this._drawerService.show(TopicCreateComponent), 500)
    } else {
    this._drawerService.show(TopicCreateComponent);
    }
  }

  public onCreateNewCalendarEvent(): void {
    if (this._isDrawerVisible) {
      this._drawerService.close();
      setTimeout(() => this._drawerService.show(CalendarEventCreateComponent, { date: new Date() }), 500)
    } else {
      this._drawerService.show(CalendarEventCreateComponent, { date: new Date() });
    }
  }

  public onPreviousRoute(): void {
    window.history.back();
  }

  public onNextRoute(): void {
    window.history.forward();
  }

  public onSearchTopics(): void {
    if (this._isDrawerVisible) {
      this._drawerService.close();
      setTimeout(() => this._drawerService.show(TopicSearchComponent), 500);
    } else {
      this._drawerService.show(TopicSearchComponent);
    }
  }

  ngOnDestroy(): void {

  }
}
