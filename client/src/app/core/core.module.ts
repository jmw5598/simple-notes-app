import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { authenticatedUserInitializer } from './initializers/authenticated-user.initializer';
import { JwtTokenInterceptor } from './interceptors/jwt-token.interceptor';
import { AuthenticationService } from './services';

const jwtTokenInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtTokenInterceptor,
  multi: true
}

const authenticationAppInitializer = { 
  provide: APP_INITIALIZER, 
  useFactory: authenticatedUserInitializer, 
  multi: true,
  deps: [Store, AuthenticationService]
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    jwtTokenInterceptor,
    authenticationAppInitializer,
  ]
})
export class CoreModule { }
