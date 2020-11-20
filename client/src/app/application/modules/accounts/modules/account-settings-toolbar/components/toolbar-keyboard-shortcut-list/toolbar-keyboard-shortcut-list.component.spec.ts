import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarKeyboardShortcutListComponent } from './toolbar-keyboard-shortcut-list.component';

describe('ToolbarKeyboardShortcutListComponent', () => {
  let component: ToolbarKeyboardShortcutListComponent;
  let fixture: ComponentFixture<ToolbarKeyboardShortcutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarKeyboardShortcutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarKeyboardShortcutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
