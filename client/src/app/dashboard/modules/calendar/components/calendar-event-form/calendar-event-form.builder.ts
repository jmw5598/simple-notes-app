 import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export const buildCalendarEventFormGroup = (formBuilder: FormBuilder): FormGroup => {
  return formBuilder.group({
    title: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    isAllDay: [false, [Validators.required]],
    location: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
}