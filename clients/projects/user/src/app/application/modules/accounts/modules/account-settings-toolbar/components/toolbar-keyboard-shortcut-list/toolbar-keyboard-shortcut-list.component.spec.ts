import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyboardShortcutActionType } from '@sn/user/core/enums';
import { KeyboardShortcutAction } from '@sn/user/core/models';

import { ToolbarKeyboardShortcutListComponent } from './toolbar-keyboard-shortcut-list.component';

describe('ToolbarKeyboardShortcutListComponent', () => {
  let component: ToolbarKeyboardShortcutListComponent;
  let fixture: ComponentFixture<ToolbarKeyboardShortcutListComponent>;

  const mockShortcut: KeyboardShortcutAction = {
    id: 1,
    action: KeyboardShortcutActionType.CREATE_CALENDAR_EVENT,
    defaultShortcut: 'default shortcut',
    description: 'alt + c',
    shortcutId: 1,
    shortcut: 'alt + a'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarKeyboardShortcutListComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarKeyboardShortcutListComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when deleteShortcut is called', () => {
    spyOn(component.onDeleteShortcut, 'emit');
    const shortcutId: number = 123;
    component.deleteShortcut(shortcutId);
    expect(component.onDeleteShortcut.emit).toHaveBeenCalledWith(shortcutId);
  });

  it('should emit event when configureShortcut is called', () => {
    spyOn(component.onConfigureShortcut, 'emit');
    component.configureShortcut(mockShortcut);
    expect(component.onConfigureShortcut.emit).toHaveBeenCalledWith(mockShortcut);
  });
});
