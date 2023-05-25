import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { AccountValidators } from '@sn/core/services';

export const buildAccountFormGroup = (
    formBuilder: UntypedFormBuilder,
    accountValidators: AccountValidators): UntypedFormGroup => {
  return formBuilder.group({
    plan: ['', [Validators.required]],
    isConfirmed: [false, [Validators.required]],
    isEnabled: [false, [Validators.required]]
  });
}
