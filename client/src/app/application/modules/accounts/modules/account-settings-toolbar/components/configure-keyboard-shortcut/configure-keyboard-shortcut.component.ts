import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DrawerService } from '@sn/shared/components';
import { KeyboardShortcutAction } from '@sn/core/models';
import { IToolbarState } from '@sn/application/store/reducers';
import { createKeyboardShortcut, deleteKeyboardShortcut } from '@sn/application/store/actions';
import { tap } from 'rxjs/operators';

import { DEFAULT_MODIFIER_OPTIONS, KeyboardShortcutModifier } from '@sn/shared/defaults';

@Component({
  selector: 'sn-configure-keyboard-shortcut',
  templateUrl: './configure-keyboard-shortcut.component.html',
  styleUrls: ['./configure-keyboard-shortcut.component.scss']
})
export class ConfigureKeyboardShortcutComponent implements OnInit {
  public shortcutForm: FormGroup;
  public shortcut$: Observable<KeyboardShortcutAction>;
  public shortcut: KeyboardShortcutAction;
  public modifierOptions: KeyboardShortcutModifier[] = DEFAULT_MODIFIER_OPTIONS;

  constructor(
    private _drawerService: DrawerService,
    private _store: Store<IToolbarState>,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.shortcutForm = this._formBuilder.group({
      modifier: ['', [Validators.required]],
      key: ['', [Validators.required, Validators.maxLength(1)]]
    });

    this.shortcut$ = this._drawerService.onDataChange()
      .pipe(tap(data => {
        if (data && data.shortcut) { 
          this.shortcut = { ...data.shortcut } as KeyboardShortcutAction
        }
      }));
  }

  public addAdditionalModifier(): void {
    console.log("added additional modifier");
  }

  public saveShortcut(shortcutFormValue: any): void {
    const shortcut: string = `${shortcutFormValue.modifier} + ${shortcutFormValue.key}`;
    console.log(shortcut);
    console.log(this.shortcut);
    this._store.dispatch(createKeyboardShortcut({ 
      actionId: this.shortcut.id, 
      shortcut: shortcut 
    }))
  }

  public resetShortcut(): void {
    this._store.dispatch(deleteKeyboardShortcut({ shortcutId: this.shortcut.shortcutId }));
    this.shortcut.shortcutId = null;
    this.shortcut.shortcut = this.shortcut.defaultShortcut;
  }
}
