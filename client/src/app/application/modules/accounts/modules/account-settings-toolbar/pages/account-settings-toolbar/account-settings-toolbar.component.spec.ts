import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { deleteKeyboardShortcut, setKeyboardShortcutResponseMessage } from '@sn/application/store/actions';
import { KeyboardShortcutActionType } from '@sn/core/enums';
import { KeyboardShortcutAction } from '@sn/core/models';
import { DrawerService } from '@sn/shared/components';

import { AccountSettingsToolbarComponent } from './account-settings-toolbar.component';

fdescribe('AccountSettingsToolbarComponent', () => {
  let component: AccountSettingsToolbarComponent;
  let fixture: ComponentFixture<AccountSettingsToolbarComponent>;

  const testDrawerService = {
    show(component: any) {}
  }

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
      imports: [NoopAnimationsModule],
      declarations: [AccountSettingsToolbarComponent],
      providers: [
        {
          provide: Store,
          useValue: testStore
        },
        {
          provide: DrawerService,
          userValue: testDrawerService
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

  // TODO this failes?????
  it('should dispatch action when onConfigureShortcut is called', () => {
    spyOn(testDrawerService, 'show');
    component.onConfigureShortcut(mockShortcut);
    expect(testDrawerService.show).toHaveBeenCalledTimes(1)
  });
});
