import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Account, Profile, Theme } from '@sn/user/core/models';
import { Store } from '@ngrx/store';
import { IAccountsState } from '../../../../store/reducers';
import { selectAccountDetails, selectAccountProfile, selectThemes } from '../../../../store/selectors';
import { fadeAnimation } from '@sn/user/shared/animations';
import { AccountValidators } from '@sn/user/core/validators';
import { buildProfileFormGroup } from '@sn/user/shared/forms';
import { changeAccountTheme, updateAccountProfile } from '../../../../store/actions';
import { DynamicThemeService } from '@sn/user/core/services';
import { UserSettings } from '@sn/user/core/models/user-settings.model';
import { selectAuthenticatedUserSettings } from '@sn/user/auth/store/selectors';

@Component({
  selector: 'sn-account-settings-general',
  templateUrl: './account-settings-general.component.html',
  styleUrls: ['./account-settings-general.component.scss'],
  animations: [fadeAnimation]
})
export class AccountSettingsGeneralComponent implements OnInit {
  public form: FormGroup;
  public isEditingProfile: boolean;
  public accountDetails$: Observable<Account>;
  public accountProfile$: Observable<Profile>;
  public themes$: Observable<Theme[]>;
  public userSettings$: Observable<UserSettings>;

  public activeTheme: Theme;

  constructor(
    private _store: Store<IAccountsState>,
    private _formBuilder: FormBuilder,
    private _accountValidators: AccountValidators,
    private _themeService: DynamicThemeService
  ) {
    this.isEditingProfile = false;
  }

  ngOnInit(): void {
    this._selectState();
    this._initializeForm();
  }

  public onEditingProfile(isEditingProfile: boolean): void {
    this.isEditingProfile = isEditingProfile;
  }

  public onUpdateProfile(formValue: { profile: Profile }): void {
    this._store.dispatch(updateAccountProfile({ profile: formValue.profile }));
    this.onEditingProfile(false);
  }

  public onChangeTheme(theme: Theme): void {
    this.activeTheme = theme;
    this._themeService.loadStyle(theme.filename);
    this._store.dispatch(changeAccountTheme({ theme: theme }));
  }

  private _selectState(): void {
    this.userSettings$ = this._store.select(selectAuthenticatedUserSettings);
    this.themes$ = this._store.select(selectThemes).pipe(tap(themes => this.activeTheme = themes[0]));
    this.accountDetails$ = this._store.select(selectAccountDetails);
    this.accountProfile$ = this._store.select(selectAccountProfile).pipe(
      tap((profile: Profile) => {
        if (profile) {
          this.form.get('profile').patchValue(profile);
        }
      })
    );
  }

  private _initializeForm(): void {
    this.form = this._formBuilder.group({
      profile: buildProfileFormGroup(this._formBuilder, this._accountValidators)
    });
  }
}
