import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnDrawerComponent } from './components/drawer/drawer.component';
import { SnDrawerService } from './components/drawer/drawer.service';

@NgModule({
  declarations: [
    SnDrawerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SnDrawerComponent
  ],
  providers: [
    SnDrawerService
  ]
})
export class SnDrawerModule { }
