import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { heroCurrencyDollar, heroShieldCheck } from '@ng-icons/heroicons/outline';

import { SnSectionHeaderModule } from '@sn/section-header';

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
    NgIconsModule.withIcons({
      heroCurrencyDollar,
      heroShieldCheck,
    }),
    SnSectionHeaderModule,
  ]
})
export class SettingsModule { }
