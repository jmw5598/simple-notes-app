import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AccountSettingsIntegrationsComponent } from './account-settings-integrations.component';

describe('AccountSettingsIntegrationsComponent', () => {
  let component: AccountSettingsIntegrationsComponent;
  let fixture: ComponentFixture<AccountSettingsIntegrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [AccountSettingsIntegrationsComponent]
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
