import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SnRadioComponent } from './components/radio/radio.component';

@NgModule({
  declarations: [
    SnRadioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    SnRadioComponent,
  ]
})
export class SnRadioModule { }
