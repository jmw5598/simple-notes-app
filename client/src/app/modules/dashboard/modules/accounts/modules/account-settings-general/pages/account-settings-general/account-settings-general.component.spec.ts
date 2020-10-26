import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsGeneralComponent } from './account-settings-general.component';

describe('AccountSettingsGeneralComponent', () => {
  let component: AccountSettingsGeneralComponent;
  let fixture: ComponentFixture<AccountSettingsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
