import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountValidators, MatchValidators } from '@sn/core/services';

export const buildUserFormGroup = (
    formBuilder: FormBuilder,
    accountValidators: AccountValidators): FormGroup => {
  return formBuilder.group({
    id: ['', [Validators.required]],
    username: ['', 
      [
        Validators.required, 
        Validators.pattern(/^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
      ], 
      // Create validator for validating usernames 
      // for admin (if the current users emai is differen validate else)
      [accountValidators.validateUsername()]
    ],
    roles: formBuilder.array([]),
    password: ['', [
      // Validators.required, 
      // Validators.minLength(8)
    ]],
    passwordConfirm: ['', [
      // Validators.required,
      // Validators.minLength(8)
    ]]
  }, { 
    validator: MatchValidators.mustMatch('password', 'passwordConfirm')
  });
};
