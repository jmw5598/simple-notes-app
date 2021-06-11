import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IToolbarState } from '@sn/user/application/store/reducers/toolbar.reducers';
import { KeyboardShortcutAction } from '@sn/user/core/models';
import { fadeAnimation } from '@sn/user/shared/animations';
import { selectKeyboardShortcuts } from '@sn/user/application/store/selectors';
import { deleteKeyboardShortcut, setKeyboardShortcutResponseMessage } from '@sn/user/application/store/actions';
import { DrawerService, DrawerLocation } from '@sn/user/shared/components';
import { ConfigureKeyboardShortcutComponent } from '../../components/configure-keyboard-shortcut/configure-keyboard-shortcut.component';

@Component({
  selector: 'sn-account-settings-toolbar',
  templateUrl: './account-settings-toolbar.component.html',
  styleUrls: ['./account-settings-toolbar.component.scss'],
  providers: [DrawerService],
  animations: [fadeAnimation]
})
export class AccountSettingsToolbarComponent implements OnInit {
  public DrawerLocation = DrawerLocation;
  public shortcuts$: Observable<KeyboardShortcutAction[]>;

  constructor(
    private _store: Store<IToolbarState>,
    private _drawerService: DrawerService
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
