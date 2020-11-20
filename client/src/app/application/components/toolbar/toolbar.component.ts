import { Component, OnInit, OnDestroy } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IToolbarState } from '../../store/reducers';
import { selectKeyboardShortcuts } from '../../store/selectors';
import { DrawerService, DrawerLocation } from '@sn/shared/components';
import { ShortcutInput, AllowIn } from 'ng-keyboard-shortcuts';


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
export class ToolbarComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void>;
  public shortcuts: ShortcutInput[] = [];
  public DrawerLocation = DrawerLocation;
  private _isDrawerVisible: boolean;

  constructor(
    private _store: Store<IToolbarState>,
    private _drawerService: DrawerService
  ) {
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this._drawerService.onDrawerVibilityChange()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(isDrawerVisible => this._isDrawerVisible = isDrawerVisible);

    this._store.select(selectKeyboardShortcuts)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(shortcuts => console.log(shortcuts));

    this.shortcuts.push(  
      {  
        key: "alt + c",
        label: 'Create Calendar Event',
        description: 'Opens drawer with create calendar event form.',
        preventDefault: true,
        allowIn: [AllowIn.Textarea, AllowIn.Input, AllowIn.Select],
        command: e => this.onCreateNewCalendarEvent()
      },
      {  
        key: "alt + t",
        preventDefault: true,
        label: 'Create Topic',
        description: 'Opens drawer with create topic form.',
        allowIn: [AllowIn.Textarea, AllowIn.Input, AllowIn.Select],
        command: e => this.onCreateNewTopic()
      },
      {  
        key: "alt + s",
        preventDefault: true,
        label: 'Search Topics',
        description: 'Opens drawer with search topics form.',
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
