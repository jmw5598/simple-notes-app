import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IToolbarState } from '@sn/user/application/store/reducers/toolbar.reducers';
import { KeyboardShortcutAction } from '@sn/shared/models';
import { fadeAnimation } from '@sn/shared/animations';
import { selectKeyboardShortcuts } from '@sn/user/application/store/selectors';
import { deleteKeyboardShortcut, setKeyboardShortcutResponseMessage } from '@sn/user/application/store/actions';
import { ConfigureKeyboardShortcutComponent } from '../../components/configure-keyboard-shortcut/configure-keyboard-shortcut.component';

import { SnDrawerService, SnDrawerLocation } from '@sn/drawer';

@Component({
  selector: 'sn-user-account-settings-toolbar',
  templateUrl: './account-settings-toolbar.component.html',
  styleUrls: ['./account-settings-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SnDrawerService],
  animations: [fadeAnimation]
})
export class AccountSettingsToolbarComponent implements OnInit {
  public DrawerLocation = SnDrawerLocation;
  public shortcuts$: Observable<KeyboardShortcutAction[]>;

  constructor(
    private _store: Store<IToolbarState>,
    private _drawerService: SnDrawerService
  ) { }

  ngOnInit(): void {
    this.shortcuts$ = this._store.select(selectKeyboardShortcuts);
  }

  public onDeleteShortcut(shortcutId: number): void {
    this._store.dispatch(deleteKeyboardShortcut({ shortcutId: shortcutId }));
    setTimeout(() => this._store.dispatch(setKeyboardShortcutResponseMessage({ message: null })), 500)
  }

  public onConfigureShortcut(shortcut: KeyboardShortcutAction): void {
    this._drawerService.show(ConfigureKeyboardShortcutComponent, { data: { shortcut: shortcut } });
  }
}
