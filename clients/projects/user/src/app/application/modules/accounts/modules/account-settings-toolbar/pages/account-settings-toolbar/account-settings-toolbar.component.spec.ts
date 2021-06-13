import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { deleteKeyboardShortcut, setKeyboardShortcutResponseMessage } from '@sn/user/application/store/actions';
import { SharedModule } from '@sn/user/shared/shared.module';
import { ToolbarKeyboardShortcutListComponent } from '../../components/toolbar-keyboard-shortcut-list/toolbar-keyboard-shortcut-list.component';

import { AccountSettingsToolbarComponent } from './account-settings-toolbar.component';

import { DrawerService } from '@sn/shared/components';
import { KeyboardShortcutAction, KeyboardShortcutActionType } from '@sn/shared/models';

describe('AccountSettingsToolbarComponent', () => {
  let component: AccountSettingsToolbarComponent;
  let fixture: ComponentFixture<AccountSettingsToolbarComponent>;
  let testDrawerService: DrawerService;

  const testStore = {
    select(selector: any) {},
    dispatch(action: any) {}
  }

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
      imports: [
        NoopAnimationsModule,
        SharedModule
      ],
      declarations: [
        AccountSettingsToolbarComponent,
        ToolbarKeyboardShortcutListComponent
      ],
      providers: [
        DrawerService,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsToolbarComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    testDrawerService = TestBed.inject(DrawerService);
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action when onDeleteShorcut is called', (done) => {
    spyOn(testStore, 'dispatch');
    const mockShortcutId: number = 123;
    component.onDeleteShortcut(mockShortcutId);
    
    expect(testStore.dispatch).toHaveBeenCalledWith(
      deleteKeyboardShortcut({ shortcutId: mockShortcutId }));
    
    jasmine.clock().tick(500);
    
    expect(testStore.dispatch).toHaveBeenCalledWith(
      setKeyboardShortcutResponseMessage({ message: null })
     );
    done();
  });

  // TODO this fails?????
  // it('should dispatch action when onConfigureShortcut is called', () => {
  //   spyOn(testDrawerService, 'show');
  //   component.onConfigureShortcut(mockShortcut);
  //   expect(testDrawerService.show).toHaveBeenCalledTimes(1)
  // });
});
