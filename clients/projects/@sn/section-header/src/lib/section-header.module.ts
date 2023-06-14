import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnSectionHeaderComponent } from './components/section-header/section-header.component';

@NgModule({
  declarations: [
    SnSectionHeaderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SnSectionHeaderComponent
  ]
})
export class SnSectionHeaderModule { }
