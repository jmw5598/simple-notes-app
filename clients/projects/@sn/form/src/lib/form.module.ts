import { NgModule } from '@angular/core';

import { SnFormGroupComponent } from './components/form-group/form-group.component';
import { SnFormLabelComponent } from './components/form-label/form-label.component';
import { SnFormControlComponent } from './components/form-control/form-control.component';
import { SnFormControlErrorComponent } from './components/form-control-error/form-control-error.component';

@NgModule({
  declarations: [
    SnFormGroupComponent,
    SnFormLabelComponent,
    SnFormControlComponent,
    SnFormControlErrorComponent,
  ],
  imports: [
  ],
  exports: [
    SnFormGroupComponent,
    SnFormLabelComponent,
    SnFormControlComponent,
    SnFormControlErrorComponent,
  ]
})
export class SnFormModule { }
