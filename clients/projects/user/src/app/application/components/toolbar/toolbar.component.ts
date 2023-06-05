import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IToolbarState } from '../../store/reducers';
import { selectKeyboardShortcuts } from '../../store/selectors';
import { FlashcardSetCreateComponent } from '@sn/user/shared/components';
import { ShortcutInput, AllowIn } from 'ng-keyboard-shortcuts';
import { getKeyboardShortcuts } from '@sn/user/application/store/actions';

import { 
  TopicCreateComponent, 
  TopicSearchComponent,
  CalendarEventCreateComponent,
  DocumentCreateComponent } from '@sn/user/shared/components';
import { TodoListCreateComponent } from '@sn/user/shared/components/todo-list-create/todo-list-create.component';

import { SnDrawerService, SnDrawerLocation, SnDrawerSize } from '@sn/drawer';
import { KeyboardShortcutActionType } from '@sn/shared/models';

@Component({
  selector: 'sn-user-global-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnDrawerService]
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void>;
  public tooltipDelay: number = 500;
  public drawerCloseTimeoutBeforeOpen: number = 500;
  public shortcuts: ShortcutInput[] = [];
  public DrawerLocation = SnDrawerLocation;
  private _isDrawerVisible: boolean;

  constructor(
    private _store: Store<IToolbarState>,
    private _drawerService: SnDrawerService
  ) {
    this._subscriptionSubject = new Subject<void>();
  }

  ngOnInit(): void {
    this._dispatchActions();
    this._selectState();
  }

  public onCreateNewTopic(): void {
    if (this._isDrawerVisible) {
      this._drawerService.close();
      setTimeout(() => 
        this._drawerService.show(TopicCreateComponent),
        this.drawerCloseTimeoutBeforeOpen
      )
    } else {
    this._drawerService.show(TopicCreateComponent);
    }
  }

  public onCreateNewCalendarEvent(): void {
    if (this._isDrawerVisible) {
      this._drawerService.close();
      setTimeout(() => 
        this._drawerService.show(CalendarEventCreateComponent, { data: { date: new Date() } }),
        this.drawerCloseTimeoutBeforeOpen  
      )
    } else {
      this._drawerService.show(CalendarEventCreateComponent, { data: { date: new Date() } });
    }
  }

  public onCreateNewDocument(): void {
    if (this._isDrawerVisible) {
      this._drawerService.close();
      setTimeout(() => 
        this._drawerService.show(DocumentCreateComponent, { size: SnDrawerSize.LARGE }),
        this.drawerCloseTimeoutBeforeOpen
      );
    } else {
      this._drawerService.show(DocumentCreateComponent, { size: SnDrawerSize.LARGE });
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
      setTimeout(() => 
        this._drawerService.show(TopicSearchComponent),
        this.drawerCloseTimeoutBeforeOpen
      );
    } else {
      this._drawerService.show(TopicSearchComponent);
    }
  }

  public onCreateFlashcardSet(): void {
    if (this._isDrawerVisible) {
      this._drawerService.close();
      setTimeout(() => 
        this._drawerService.show(FlashcardSetCreateComponent, { size: SnDrawerSize.LARGE }),
        this.drawerCloseTimeoutBeforeOpen  
      );
    } else {
      this._drawerService.show(FlashcardSetCreateComponent, { size: SnDrawerSize.LARGE });
    }
  }

  public onCreateTodoList(): void {
    if (this._isDrawerVisible) {
      this._drawerService.close();
      setTimeout(() => 
        this._drawerService.show(TodoListCreateComponent),
        this.drawerCloseTimeoutBeforeOpen  
      );
    } else {
      this._drawerService.show(TodoListCreateComponent);
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
        return (e) => this.onCreateNewDocument();
      
      case KeyboardShortcutActionType.CREATE_FLASHCARD_SET:
        return (e) => this.onCreateFlashcardSet();

      case KeyboardShortcutActionType.CREATE_TODO_LIST:
        return (e) => this.onCreateTodoList();
    }
  }

  private _dispatchActions(): void {
    this._store.dispatch(getKeyboardShortcuts());
  }

  private _selectState(): void {
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

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
