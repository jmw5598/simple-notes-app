import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnAlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    SnAlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SnAlertComponent
  ]
})
export class SnAlertModule { }
