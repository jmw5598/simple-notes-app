import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export const buildSectionFormGroup = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    id: [''],
    title: ['', Validators.required],
    synopsis: ['', Validators.required]
  });
}
