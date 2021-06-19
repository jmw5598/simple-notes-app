import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '@sn/admin/env/environment';

import { CoreFramingModule } from '@sn/core/framing';
import { CoreServicesModule, CoreServicesConfiguration } from '@sn/core/services';
import { SharedComponentsModule } from '@sn/shared/components';
import { StoreModule } from '@ngrx/store';

import { ROOT_REDUCERS, metaReducers } from '@sn/user/store/reducers';
import { AuthenticationEffects } from './auth/store/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoreModule } from './core/core.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { HttpErrorEffects, PlansEffects } from './core/store/effects';

const coreServicesConfiguration: CoreServicesConfiguration = {
  ...environment
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    CoreFramingModule.forRoot(),
    CoreServicesModule.forRoot(coreServicesConfiguration),
    SharedComponentsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
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
      HttpErrorEffects,
      PlansEffects
    ]),
    StoreDevtoolsModule.instrument({
      name: 'Simple Notes Administration App',
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
