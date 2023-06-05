import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SnCheckboxComponent } from './components/checkbox/checkbox.component';

@NgModule({
  declarations: [
    SnCheckboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    SnCheckboxComponent,
  ]
})
export class SnCheckboxModule { }
