import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsPlansRoutingModule } from './settings-plans-routing.module';
import { SettingsPlansComponent } from './pages/settings-plans/settings-plans.component';

@NgModule({
  declarations: [
    SettingsPlansComponent
  ],
  imports: [
    CommonModule,
    SettingsPlansRoutingModule
  ]
})
export class SettingsPlansModule { }
