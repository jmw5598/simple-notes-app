import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsIntegrationsComponent } from './account-settings-integrations.component';

describe('AccountSettingsIntegrationsComponent', () => {
  let component: AccountSettingsIntegrationsComponent;
  let fixture: ComponentFixture<AccountSettingsIntegrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsIntegrationsComponent ]
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
