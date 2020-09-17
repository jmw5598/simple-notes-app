import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    TagInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    TagInputComponent
  ]
})
export class SharedModule { }
