import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Permission } from '@sn/shared/models';

export const buildTopicFormGroup = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    title: ['', [Validators.required]],
    synopsis: ['', [Validators.required]],
    permission: [Permission.PRIVATE, [Validators.required]],
    categories: formBuilder.array([])
  });
}
