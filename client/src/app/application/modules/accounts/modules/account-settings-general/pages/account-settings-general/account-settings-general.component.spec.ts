import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountSettingsGeneralComponent } from './account-settings-general.component';
import { AccountDetailsDisplayComponent } from '../../components/account-details-display/account-details-display.component';
import { AccountDetailsFormComponent } from '../../components/account-details-form/account-details-form.component';

describe('AccountSettingsGeneralComponent', () => {
  let component: AccountSettingsGeneralComponent;
  let fixture: ComponentFixture<AccountSettingsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AccountSettingsGeneralComponent,
        AccountDetailsDisplayComponent,
        AccountDetailsFormComponent
      ]
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
