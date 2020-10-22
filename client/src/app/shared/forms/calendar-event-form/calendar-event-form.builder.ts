 import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export const buildCalendarEventFormGroup = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    id: [''],
    title: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    isAllDay: [false, [Validators.required]],
    color: ['', [
      Validators.required, 
      Validators.pattern(/^[#]{1}[A-Fa-f0-9]{6}$/g)
    ]],
    location: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
}