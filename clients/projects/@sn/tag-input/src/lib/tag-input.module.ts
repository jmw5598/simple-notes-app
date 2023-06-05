import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SnTagInputComponent } from './components/tag-input/tag-input.component';

@NgModule({
  declarations: [
    SnTagInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    SnTagInputComponent
  ]
})
export class SnTagInputModule { }
