import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountSettingsGeneralComponent } from './account-settings-general.component';
import { AccountDetailsDisplayComponent } from '../../components/account-details-display/account-details-display.component';
import { AccountDetailsFormComponent } from '../../components/account-details-form/account-details-form.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('AccountSettingsGeneralComponent', () => {
  let component: AccountSettingsGeneralComponent;
  let fixture: ComponentFixture<AccountSettingsGeneralComponent>;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AccountSettingsGeneralComponent,
        AccountDetailsDisplayComponent,
        AccountDetailsFormComponent
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
    fixture = TestBed.createComponent(AccountSettingsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
