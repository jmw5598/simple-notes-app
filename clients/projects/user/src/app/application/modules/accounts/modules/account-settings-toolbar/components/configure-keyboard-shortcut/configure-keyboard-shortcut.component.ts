import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DrawerService } from '@sn/user/shared/components';
import { KeyboardShortcutAction, ResponseMessage } from '@sn/user/core/models';
import { IToolbarState } from '@sn/user/application/store/reducers';
import { createKeyboardShortcut, updateKeyboardShortcut, deleteKeyboardShortcut, setKeyboardShortcutResponseMessage, getKeyboardShortcuts } from '@sn/user/application/store/actions';
import { selectKeyboardShortcutResponseMessage } from '@sn/user/application/store/selectors';
import { tap } from 'rxjs/operators';

import { DEFAULT_MODIFIER_OPTIONS, KeyboardShortcutModifier } from '@sn/user/shared/defaults';
import { showHide } from '@sn/user/shared/animations';
import { ResponseStatus } from '@sn/user/core/enums';

@Component({
  selector: 'sn-configure-keyboard-shortcut',
  templateUrl: './configure-keyboard-shortcut.component.html',
  styleUrls: ['./configure-keyboard-shortcut.component.scss'],
  animations: [showHide]
})
export class ConfigureKeyboardShortcutComponent implements OnInit, OnDestroy {
  public ResponseStatus = ResponseStatus;
  public shortcutForm: FormGroup;
  public shortcut$: Observable<KeyboardShortcutAction>;
  public shortcut: KeyboardShortcutAction;
  public responseMessage$: Observable<ResponseMessage>;
  public modifierOptions: KeyboardShortcutModifier[] = DEFAULT_MODIFIER_OPTIONS;

  constructor(
    private _drawerService: DrawerService,
    private _store: Store<IToolbarState>,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._listenForKeyboardShortcutResponseMessages();
    this._listenForDrawerServiceDataChanges();
    this._initializeForm();
  }

  public addAdditionalModifier(): void {
    console.log("added additional modifier");
  }

  public saveShortcut(shortcutFormValue: any): void {
    const shortcut: string = `${shortcutFormValue.modifier} + ${shortcutFormValue.key}`;
    if (this.shortcut.shortcutId) {
      this._store.dispatch(updateKeyboardShortcut({ 
        actionId: this.shortcut.id,
        shortcutId: this.shortcut.shortcutId,
        shortcut: shortcut
      }))
    } else {
      this._store.dispatch(createKeyboardShortcut({ 
        actionId: this.shortcut.id, 
        shortcut: shortcut 
      }))
    }
  }

  public resetShortcut(): void {
    this._store.dispatch(deleteKeyboardShortcut({ shortcutId: this.shortcut.shortcutId }));
    this.shortcut.shortcutId = null;
    this.shortcut.shortcut = this.shortcut.defaultShortcut;
  }

  private _listenForKeyboardShortcutResponseMessages(): void {
    this.responseMessage$ = this._store.select(selectKeyboardShortcutResponseMessage)
      .pipe(tap(message => {
        if (message) {          
          setTimeout(() => {
            this._store.dispatch(setKeyboardShortcutResponseMessage({ message: null }))
          }, 3000)
        }
      }));
  }
  
  private _listenForDrawerServiceDataChanges(): void {
    this.shortcut$ = this._drawerService.onDataChange()
      .pipe(tap(data => {
        if (data && data.shortcut) { 
          this.shortcut = { ...data.shortcut } as KeyboardShortcutAction
          // if shortcut action has shortcut (shortcutId) patch values through to form.
          if (data.shortcut.shortcutId) {
            const [modifier, key] = data.shortcut.shortcut.split(' + ');
            this.shortcutForm.patchValue({ modifier, key });
          }
        }
      }));
  }

  private _initializeForm(): void {
    this.shortcutForm = this._formBuilder.group({
      modifier: ['', [Validators.required]],
      key: ['', [Validators.required, Validators.maxLength(1)]]
    });
  }

  ngOnDestroy(): void {
    this._store.dispatch(setKeyboardShortcutResponseMessage({ message: null }));
  }
}
