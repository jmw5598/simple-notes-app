import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountValidators } from '@sn/core/services';

export const buildAccountFormGroup = (
    formBuilder: FormBuilder,
    accountValidators: AccountValidators): FormGroup => {
  return formBuilder.group({
    plan: ['', [Validators.required]]
  });
}
