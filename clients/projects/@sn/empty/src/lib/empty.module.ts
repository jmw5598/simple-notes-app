import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnEmptyDataComponent } from './components/empty-data/empty-data.component';

@NgModule({
  declarations: [
    SnEmptyDataComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SnEmptyDataComponent,
  ]
})
export class SnEmptyModule { }
