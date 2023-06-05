import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnLoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    SnLoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SnLoadingSpinnerComponent,
  ]
})
export class SnLoadingSpinnerModule { }
