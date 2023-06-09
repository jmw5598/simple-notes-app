 import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';

export const buildTodoListFormGroup = (formBuilder: UntypedFormBuilder): UntypedFormGroup => {
  return formBuilder.group({
    id: [''],
    title: ['', [Validators.required]],
    startedBy: ['', [Validators.required]],
    completedBy: ['', [Validators.required]],
    description: [''],
    todos: formBuilder.array([], [Validators.required])
  });
}
