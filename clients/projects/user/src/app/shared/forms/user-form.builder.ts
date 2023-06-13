import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { AccountValidators, MatchValidators } from '@sn/core/services';

export const buildUserFormGroup = (
    formBuilder: UntypedFormBuilder,
    accountValidators: AccountValidators): UntypedFormGroup => {
  return formBuilder.group({
      username: ['', 
        [
          Validators.required, 
          Validators.pattern(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
        ], 
        [accountValidators.validateUsername()]
      ],
      password: ['', [
        Validators.required, 
        Validators.minLength(8)
      ]],
      passwordConfirm: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    }, { 
      validator: MatchValidators.mustMatch('password', 'passwordConfirm')
    });
};
