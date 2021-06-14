import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const handleHttpError = createAction(
  '[Http Error] Handle Http Error',
  props<{ error: HttpErrorResponse }>()
);
