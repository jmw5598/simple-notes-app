import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeyboardShortcutAction } from '@sn/shared/models';

@Component({
  selector: 'sn-user-toolbar-keyboard-shortcut-list',
  templateUrl: './toolbar-keyboard-shortcut-list.component.html',
  styleUrls: ['./toolbar-keyboard-shortcut-list.component.scss']
})
export class ToolbarKeyboardShortcutListComponent implements OnInit {
  @Input()
  public shortcuts: KeyboardShortcutAction[];

  @Output()
  public onDeleteShortcut: EventEmitter<number>;

  @Output()
  public onConfigureShortcut: EventEmitter<KeyboardShortcutAction>;

  constructor() {
    this.onDeleteShortcut = new EventEmitter<number>();
    this.onConfigureShortcut = new EventEmitter<KeyboardShortcutAction>();
  }

  ngOnInit(): void {
  }

  public deleteShortcut(shortcutId: number): void {
    this.onDeleteShortcut.emit(shortcutId);
  }

  public configureShortcut(shortcut: KeyboardShortcutAction): void {
    this.onConfigureShortcut.emit(shortcut); 
  }
}
