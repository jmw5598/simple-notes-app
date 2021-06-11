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

  beforeEach(() => {
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display profile form when is onEditingProfile is called with true', () => {
    const isEditingProfile: boolean = true;
    const accountSettingGeneralElement: HTMLElement = fixture.nativeElement;

    component.onEditingProfile(isEditingProfile);
    fixture.detectChanges();
    const editProfileFormElement: HTMLElement = accountSettingGeneralElement.querySelector('#edit-profile-form');
    const profileDetailsComponentElement: HTMLElement = accountSettingGeneralElement.querySelector('sn-user-account-details-display');

    expect(editProfileFormElement).not.toBeNull();
    expect(profileDetailsComponentElement).toBeNull();
  });

  it('should hide profile form when is editProfile is called with false', () => {
    const isEditingProfile: boolean = false;
    const accountSettingGeneralElement: HTMLElement = fixture.nativeElement;

    component.onEditingProfile(isEditingProfile);
    fixture.detectChanges();
    const editProfileFormElement: HTMLElement = accountSettingGeneralElement.querySelector('#edit-profile-form');
    const profileDetailsComponentElement: HTMLElement = accountSettingGeneralElement.querySelector('sn-user-account-details-display');

    expect(editProfileFormElement).toBeNull();
    expect(profileDetailsComponentElement).not.toBeNull();
  });

  it('shoulde set call Store.dispatch and hide edit profile form when onUpdateProfile is called', () => {
    const accountSettingGeneralElement: HTMLElement = fixture.nativeElement;
    spyOn(testStore, 'dispatch');

    component.onUpdateProfile({ profile: null });
    fixture.detectChanges();
    const editProfileFormElement: HTMLElement = accountSettingGeneralElement.querySelector('#edit-profile-form');
    const profileDetailsComponentElement: HTMLElement = accountSettingGeneralElement.querySelector('sn-user-account-details-display');

    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    expect(editProfileFormElement).toBeNull();
    expect(profileDetailsComponentElement).not.toBeNull();
  });
});
