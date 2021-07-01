import { FormBuilder, Validators } from '@angular/forms';

export const buildRolesForm = (formBuilder: FormBuilder) => {
  return formBuilder.group({
    id: [''],
    name: ['', [Validators.required]]
  });
}
