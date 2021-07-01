import { FormBuilder, Validators } from '@angular/forms';

export const buildPlansForm = (formBuilder: FormBuilder) => {
  return formBuilder.group({
    id: [''],
    name: ['', [Validators.required]]
  });
}
