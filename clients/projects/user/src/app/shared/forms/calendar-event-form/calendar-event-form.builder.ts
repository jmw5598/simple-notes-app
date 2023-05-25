 import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';

export const buildCalendarEventFormGroup = (formBuilder: UntypedFormBuilder): UntypedFormGroup => {
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
      Validators.pattern(/^[#]{1}[A-Fa-f0-9]{6}$/)
    ]],
    location: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
}