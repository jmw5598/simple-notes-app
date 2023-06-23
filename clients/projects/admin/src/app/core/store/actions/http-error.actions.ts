import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, props } from '@ngrx/store';

export const HttpErrorActions = createActionGroup({
  source: 'Http Error',
  events: {
    'Handle Http Error': props<{ error: HttpErrorResponse }>(),
  }
});
