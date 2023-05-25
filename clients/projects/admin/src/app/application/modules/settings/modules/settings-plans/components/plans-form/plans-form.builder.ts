import { UntypedFormBuilder, Validators } from '@angular/forms';

export const buildPlansForm = (formBuilder: UntypedFormBuilder) => {
  return formBuilder.group({
    id: [''],
    name: ['', [Validators.required]]
  });
}
