import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IToolbarState } from '../../store/reducers';
import { selectKeyboardShortcuts } from '../../store/selectors';
import { DrawerService, DrawerLocation } from '@sn/shared/components';
import { ShortcutInput, AllowIn } from 'ng-keyboard-shortcuts';
import { getKeyboardShortcuts } from '@sn/application/store/actions';
import { KeyboardShortcutActionType } from '@sn/core/enums';
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
    this._store.dispatch(getKeyboardShortcuts());
    this._drawerService.onDrawerVibilityChange()
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(isDrawerVisible => this._isDrawerVisible = isDrawerVisible);
      
    this._store.select(selectKeyboardShortcuts)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(shortcuts => {
        if (!shortcuts) return;
        this.shortcuts = shortcuts.map(shortcut => {
          const command: Function = this._determineCommand(shortcut.action);
          return {
            key: shortcut.shortcut || shortcut.defaultShortcut,
            label: shortcut.action,
            description: shortcut.description,
            preventDefault: true,
            allowIn: [AllowIn.Textarea, AllowIn.Input, AllowIn.Select],
            command: command
          } as ShortcutInput
        });
      });
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
      setTimeout(() => this._drawerService.show(CalendarEventCreateComponent, { data: { date: new Date() } }), 500)
    } else {
      this._drawerService.show(CalendarEventCreateComponent, { data: { date: new Date() } });
    }
  }

  public onCreateNewDocumentEvent(): void {
    console.log('Creating new document in drawer!');
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

  private _determineCommand(action: KeyboardShortcutActionType): Function {
    switch (action) {
      case KeyboardShortcutActionType.CREATE_CALENDAR_EVENT:
        return (e) => this.onCreateNewCalendarEvent();
      
      case KeyboardShortcutActionType.CREATE_TOPIC:
        return (e) => this.onCreateNewTopic();

      case KeyboardShortcutActionType.SEARCH_TOPICS:
        return (e) => this.onSearchTopics();

      case KeyboardShortcutActionType.CREATE_DOCUMENT:
        return (e) => this.onCreateNewDocumentEvent();
    }
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
