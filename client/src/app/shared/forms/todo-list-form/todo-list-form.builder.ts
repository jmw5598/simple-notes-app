 import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export const buildTodoListFormGroup = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    id: [''],
    title: ['', [Validators.required]],
    startedBy: ['', [Validators.required]],
    completedBy: ['', [Validators.required]],
    description: [''],
    todos: formBuilder.array([], [Validators.required])
  });
}
