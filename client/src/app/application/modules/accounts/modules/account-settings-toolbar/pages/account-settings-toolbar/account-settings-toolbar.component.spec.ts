import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';

import { AccountSettingsToolbarComponent } from './account-settings-toolbar.component';

describe('AccountSettingsToolbarComponent', () => {
  let component: AccountSettingsToolbarComponent;
  let fixture: ComponentFixture<AccountSettingsToolbarComponent>;
  const testStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [AccountSettingsToolbarComponent],
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
    fixture = TestBed.createComponent(AccountSettingsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
