import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRolesRoutingModule } from './settings-roles-routing.module';
import { SettingsRolesComponent } from './pages/settings-roles/settings-roles.component';

@NgModule({
  declarations: [
    SettingsRolesComponent
  ],
  imports: [
    CommonModule,
    SettingsRolesRoutingModule
  ]
})
export class SettingsRolesModule { }
