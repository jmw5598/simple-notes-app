import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Permission } from '@sn/user/shared/models';

export const buildTopicFormGroup = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    id: [''],
    title: ['', [Validators.required]],
    synopsis: ['', [Validators.required]],
    permission: [Permission.PRIVATE, [Validators.required]],
    categories: formBuilder.array([])
  });
}
