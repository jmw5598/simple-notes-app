import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DrawerService } from '@sn/shared/components';
import { KeyboardShortcutAction } from '@sn/core/models';
import { IToolbarState } from '@sn/application/store/reducers';
import { deleteKeyboardShortcut } from '@sn/application/store/actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'sn-configure-keyboard-shortcut',
  templateUrl: './configure-keyboard-shortcut.component.html',
  styleUrls: ['./configure-keyboard-shortcut.component.scss']
})
export class ConfigureKeyboardShortcutComponent implements OnInit {
  public shortcut$: Observable<KeyboardShortcutAction>;
  public shortcut: KeyboardShortcutAction;

  constructor(
    private _drawerService: DrawerService,
    private _store: Store<IToolbarState>
  ) { }

  ngOnInit(): void {
    this.shortcut$ = this._drawerService.onDataChange()
      .pipe(tap(data => {
        if (data && data.shortcut) { 
          this.shortcut = { ...data.shortcut } as KeyboardShortcutAction
        }
      }));
  }

  public resetShortcut(): void {
    this._store.dispatch(deleteKeyboardShortcut({ shortcutId: this.shortcut.shortcutId }));
    this.shortcut.shortcutId = null;
    this.shortcut.shortcut = this.shortcut.defaultShortcut;
  }
}
