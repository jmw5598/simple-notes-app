import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHttpErrorInterceptor, JwtTokenInterceptor } from '@sn/user/core/interceptors';
import { authenticatedUserInitializer } from './initializers';
import { AuthenticationService } from '@sn/core/services';
import { Store } from '@ngrx/store';

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

const globalHttpErrorInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: GlobalHttpErrorInterceptor,
  multi: true
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    jwtTokenInterceptor,
    authenticationAppInitializer,
    globalHttpErrorInterceptor
  ]
})
export class CoreModule { }
