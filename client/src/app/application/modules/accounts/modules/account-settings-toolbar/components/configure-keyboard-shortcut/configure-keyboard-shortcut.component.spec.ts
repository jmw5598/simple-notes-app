import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureKeyboardShortcutComponent } from './configure-keyboard-shortcut.component';

describe('ConfigureKeyboardShortcutComponent', () => {
  let component: ConfigureKeyboardShortcutComponent;
  let fixture: ComponentFixture<ConfigureKeyboardShortcutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureKeyboardShortcutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureKeyboardShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
