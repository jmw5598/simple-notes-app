import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountValidators } from '@sn/user/core/validators';

export const buildAccountFormGroup = (
    formBuilder: FormBuilder,
    accountValidators: AccountValidators): FormGroup => {
  return formBuilder.group({
    plan: ['', [Validators.required]]
  });
}
