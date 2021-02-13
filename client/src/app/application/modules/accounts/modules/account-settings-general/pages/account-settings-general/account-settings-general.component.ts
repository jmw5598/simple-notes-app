import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Account, Profile, Theme } from '@sn/core/models';
import { Store } from '@ngrx/store';
import { IAccountsState } from '../../../../store/reducers';
import { selectAccountDetails, selectAccountProfile, selectThemes } from '../../../../store/selectors';
import { fadeAnimation } from '@sn/shared/animations';
import { AccountValidators } from '@sn/core/validators';
import { buildProfileFormGroup } from '@sn/shared/forms';
import { updateAccountProfile } from '../../../../store/actions';
import { DynamicThemeService } from '@sn/core/services';

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
    this.themes$ = this._store.select(selectThemes).pipe(tap(themes => this.activeTheme = themes[0]));
    this.accountDetails$ = this._store.select(selectAccountDetails);
    this.accountProfile$ = this._store.select(selectAccountProfile).pipe(
      tap((profile: Profile) => {
        if (profile) {
          this.form.get('profile').patchValue(profile);
        }
      })
    );
    this.form = this._formBuilder.group({
      profile: buildProfileFormGroup(this._formBuilder, this._accountValidators)
    });
  }

  public onEditingProfile(isEditingProfile: boolean): void {
    this.isEditingProfile = isEditingProfile;
  }

  public onUpdateProfile(formValue: { profile: Profile }): void {
    this._store.dispatch(updateAccountProfile({ profile: formValue.profile }));
    this.onEditingProfile(false);
  }

  public onChangeTheme(theme: Theme): void {
    console.log("Changing to theme");
    this._themeService.loadStyle(theme.filename);
    this.activeTheme = theme;
    // this._store.dispatch(saveThemeChange({ theme: theme }));
  }
}
