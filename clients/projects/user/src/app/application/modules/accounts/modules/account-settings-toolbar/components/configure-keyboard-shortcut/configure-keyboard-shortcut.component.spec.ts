import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createKeyboardShortcut, deleteKeyboardShortcut, updateKeyboardShortcut } from '@sn/user/application/store/actions';
import { KeyboardShortcutActionType } from '@sn/user/core/enums';
import { KeyboardShortcutAction } from '@sn/user/core/models';
import { SharedModule } from '@sn/user/shared/shared.module';
import { of } from 'rxjs';

import { ConfigureKeyboardShortcutComponent } from './configure-keyboard-shortcut.component';

describe('ConfigureKeyboardShortcutComponent', () => {
  let component: ConfigureKeyboardShortcutComponent;
  let fixture: ComponentFixture<ConfigureKeyboardShortcutComponent>;
  
  const mockShortcut: KeyboardShortcutAction = {
    id: 1,
    action: KeyboardShortcutActionType.CREATE_CALENDAR_EVENT,
    defaultShortcut: 'default shortcut',
    description: 'alt + c',
    shortcutId: 1,
    shortcut: 'alt + a'
  };
  
  const mockShortcutFormValue = { 
    modifier: 'alt', 
    key: 'a' 
  };
  
  const testStore = {
    select: () => of(),
    dispatch: (action: any) => {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        SharedModule
      ],
      declarations: [
        ConfigureKeyboardShortcutComponent
      ],
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureKeyboardShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action to update shortcut when saveShortcut is called', () => {
    spyOn(testStore, 'dispatch');
    component.shortcut = mockShortcut;
    component.saveShortcut(mockShortcutFormValue);
    expect(testStore.dispatch).toHaveBeenCalledWith(updateKeyboardShortcut({
      actionId: mockShortcut.id,
      shortcutId: mockShortcut.shortcutId,
      shortcut: mockShortcut.shortcut
    }));
  });

  it('should dispatch action to create shortcut when saveShortcut is called', () => {
    spyOn(testStore, 'dispatch');
    component.shortcut = { ...mockShortcut, shortcutId: undefined };
    component.saveShortcut(mockShortcutFormValue);
    expect(testStore.dispatch).toHaveBeenCalledWith(createKeyboardShortcut({
      actionId: mockShortcut.id,
      shortcut: mockShortcut.shortcut
    }));
  })

  it('should dispatch action to reset/delete shortcut when resetShortcut method is called', () => {
    spyOn(testStore, 'dispatch');
    component.shortcut = { ...mockShortcut };
    component.resetShortcut();
    expect(testStore.dispatch).toHaveBeenCalledWith(deleteKeyboardShortcut({
      shortcutId: mockShortcut.id
    }));
  });
});
