import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';

export const buildSectionFormGroup = (formBuilder: UntypedFormBuilder): UntypedFormGroup => {
  return formBuilder.group({
    id: [''],
    title: ['', Validators.required],
    synopsis: ['', Validators.required]
  });
}
