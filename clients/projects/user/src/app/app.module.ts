import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ROOT_REDUCERS, metaReducers } from '@sn/user/store/reducers';
import { AuthenticationEffects } from './auth/store/effects';
import { PlansEffects } from './core/store/effects';

import { environment } from '@sn/user/env/environment';
import { HttpErrorEffects } from './application/store/effects/http-error.effects';

import { CoreFramingModule } from '@sn/core/framing';
import { CoreServicesModule, CoreServicesConfiguration } from '@sn/core/services';
import { SharedComponentsModule } from '@sn/shared/components';

const coreServicesConfiguration: CoreServicesConfiguration = {
  ...environment
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreFramingModule.forRoot(),
    CoreServicesModule.forRoot(coreServicesConfiguration),
    SharedComponentsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      // runtimeChecks: {
      //   strictStateSerializability: true,
      //   strictActionSerializability: true,
      //   strictActionWithinNgZone: true,
      //   strictActionTypeUniqueness: true,
      // },
    }),
    EffectsModule.forRoot([
      AuthenticationEffects,
      PlansEffects,
      HttpErrorEffects
    ]),
    StoreDevtoolsModule.instrument({
      name: 'Simple Notes App',
      logOnly: environment.production      
    }),
    ConfirmationPopoverModule.forRoot({
      popoverMessage: 'Are you sure?',
      cancelButtonType: 'btn-default btn-sm bg-secondary',
      confirmButtonType: 'btn-primary btn-sm bg-primary text-light'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
