import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { AccountValidators } from '@sn/core/services';
import { buildAddressFormGroup } from './address-form.builder';

export const buildProfileFormGroup = (
    formBuilder: UntypedFormBuilder,
    accountValidators: AccountValidators): UntypedFormGroup => {
  return formBuilder.group({
    firstName: ['', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z\s]{3,20}$/)
    ]],
    lastName: ['', [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z\s]{3,20}$/)
    ]],
    email: ['', 
      [Validators.required, Validators.email], 
      [accountValidators.validateEmail()]
    ],
    address: buildAddressFormGroup(
      formBuilder,
      accountValidators
    )
  });
};
