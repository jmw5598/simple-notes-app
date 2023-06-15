import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnLinkComponent } from './components/link/link.component';

@NgModule({
  declarations: [
    SnLinkComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SnLinkComponent,
  ]
})
export class SnLinkModule { }
