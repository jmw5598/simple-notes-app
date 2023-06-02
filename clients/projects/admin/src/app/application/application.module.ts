import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { applicationFeatureKey, applicationReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { AccountsEffects } from './modules/accounts/store/effects';

import { CoreFramingModule } from '@sn/core/framing';
import { SharedComponentsModule } from '@sn/shared/components';

import { NgIconsModule } from '@ng-icons/core';
import {
  heroUserPlus,
  heroArrowSmallLeft,
  heroArrowSmallRight } from '@ng-icons/heroicons/outline';

@NgModule({
  declarations: [
    ApplicationComponent,
    ToolbarComponent
  ],
  imports: [
    CoreFramingModule,
    SharedComponentsModule,
    ApplicationRoutingModule,
    CommonModule,
    StoreModule.forFeature(applicationFeatureKey, applicationReducer),
    EffectsModule.forFeature([
      AccountsEffects
    ]),
    NgIconsModule.withIcons({
      heroUserPlus,
      heroArrowSmallLeft,
      heroArrowSmallRight,
    })
  ],
  providers:  [
    {
      provide: Window,
      useValue: window
    }
  ]
})
export class ApplicationModule { }
