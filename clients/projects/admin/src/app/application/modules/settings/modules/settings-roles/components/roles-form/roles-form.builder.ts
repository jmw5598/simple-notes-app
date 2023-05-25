import { UntypedFormBuilder, Validators } from '@angular/forms';

export const buildRolesForm = (formBuilder: UntypedFormBuilder) => {
  return formBuilder.group({
    id: [''],
    name: ['', [Validators.required]]
  });
}
