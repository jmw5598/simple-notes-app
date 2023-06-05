import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnToasterComponent } from './components/toaster/toaster.component';
import { SnToasterService } from './components/toaster/toaster.service';

@NgModule({
  declarations: [
    SnToasterComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SnToasterComponent
  ],
  providers: [
    SnToasterService
  ]
})
export class SnToasterModule { }
