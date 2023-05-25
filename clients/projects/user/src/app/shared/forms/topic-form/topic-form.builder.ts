import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { Permission } from '@sn/shared/models';

export const buildTopicFormGroup = (formBuilder: UntypedFormBuilder): UntypedFormGroup => {
  return formBuilder.group({
    id: [''],
    title: ['', [Validators.required]],
    synopsis: ['', [Validators.required]],
    permission: [Permission.PRIVATE, [Validators.required]],
    categories: formBuilder.array([])
  });
}
