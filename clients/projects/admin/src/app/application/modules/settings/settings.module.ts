import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsNavigationComponent } from './components/settings-navigation/settings-navigation.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  declarations: [
    SettingsNavigationComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
  ]
})
export class SettingsModule { }
