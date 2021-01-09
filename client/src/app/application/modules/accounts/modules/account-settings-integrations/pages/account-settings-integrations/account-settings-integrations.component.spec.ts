import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AccountSettingsIntegrationsComponent } from './account-settings-integrations.component';

describe('AccountSettingsIntegrationsComponent', () => {
  let component: AccountSettingsIntegrationsComponent;
  let fixture: ComponentFixture<AccountSettingsIntegrationsComponent>;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        AccountSettingsIntegrationsComponent
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
    fixture = TestBed.createComponent(AccountSettingsIntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
