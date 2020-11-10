import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '@sn/shared/shared.module';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { NavbarSideComponent } from './components/navigation/navbar-side/navbar-side.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { applicationReducer, applicationFeatureKey } from './store';
import { AccountsEffects } from './modules/accounts/store/effects';
import { CalendarEventsEffects } from './modules/calendar/store/effects';
import { CalendarIntegrationsEffects } from './modules/accounts/modules/account-settings-integrations/store/effects';
import { DashboardEffects } from './modules/dashboard/store/effects/dashboard.effects';
import { DocumentsEffects } from './modules/documents/store/effects/documents.effects';
import { SectionsEffects } from './modules/topics/store/effects/sections.effects';
import { TopicsEffects } from './modules/topics/store/effects/topics.effects';

@NgModule({
  declarations: [
    ApplicationComponent,
    NavbarComponent,
    NavbarSideComponent,
    NavigationComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApplicationRoutingModule,
    StoreModule.forFeature(applicationFeatureKey, applicationReducer),
    EffectsModule.forFeature([
      AccountsEffects,
      CalendarEventsEffects,
      CalendarIntegrationsEffects,
      DashboardEffects,
      DocumentsEffects,
      SectionsEffects,
      TopicsEffects
    ])
  ]
})
export class ApplicationModule { }
