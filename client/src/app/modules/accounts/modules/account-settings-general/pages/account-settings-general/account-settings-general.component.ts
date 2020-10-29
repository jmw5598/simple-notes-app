import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Account, Profile } from '@sn/core/models';
import { Store } from '@ngrx/store';
import { IAppState } from '@sn/core/store/state';
import { selectAccountDetails, selectAccountProfile } from '@sn/core/store/selectors';
import { fadeAnimation } from '@sn/shared/animations';
import { AccountValidators } from '@sn/core/validators';
import { buildProfileFormGroup } from '@sn/shared/forms';
import { updateAccountProfile } from '@sn/core/store/actions';

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

  constructor(
    private _store: Store<IAppState>,
    private _formBuilder: FormBuilder,
    private _accountValidators: AccountValidators
  ) {
    this.isEditingProfile = false;
  }

  ngOnInit(): void {
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

  public editProfile(isEditingProfile: boolean): void {
    this.isEditingProfile = isEditingProfile;
  }

  public onEditingProfile(isEditingProfile: boolean): void {
    this.isEditingProfile = isEditingProfile;
  }

  public onUpdateProfile(formValue: { profile: Profile }): void {
    this._store.dispatch(updateAccountProfile({ profile: formValue.profile }));
    this.onEditingProfile(false);
  }

  public updateProfile(formValue: { profile: Profile }): void {
    this.isEditingProfile = false;
  }
}
