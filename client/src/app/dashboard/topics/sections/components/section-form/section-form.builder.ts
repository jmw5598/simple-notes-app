import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export const buildSectionFormGroup = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    title: ['', Validators.required],
    synopsis: ['', Validators.required]
  });
}
