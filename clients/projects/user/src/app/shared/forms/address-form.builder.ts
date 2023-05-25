import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { AccountValidators } from '@sn/core/services';

export const buildAddressFormGroup = (
    formBuilder: UntypedFormBuilder,
    accountValidators: AccountValidators): UntypedFormGroup => {
  return formBuilder.group({
    street: ['', [Validators.required]],
    street2: [''],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zip: ['', [Validators.required]]
  });;
}