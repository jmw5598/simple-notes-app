import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '@sn/admin/env/environment';

import { CoreFramingModule } from '@sn/core/framing';
import { CoreServicesModule, CoreServicesConfiguration } from '@sn/core/services';
import { SharedComponentsModule } from '@sn/shared/components';

const coreServicesConfiguration: CoreServicesConfiguration = {
  ...environment
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreFramingModule.forRoot(),
    CoreServicesModule.forRoot(coreServicesConfiguration),
    SharedComponentsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
