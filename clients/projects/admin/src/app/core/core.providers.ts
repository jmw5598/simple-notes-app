import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, makeEnvironmentProviders } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '@sn/core/services';
import { authenticatedUserInitializer } from './initializers';
import { GlobalHttpErrorInterceptor, JwtTokenInterceptor } from './interceptors';

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

export const provideCoreProviders = () => makeEnvironmentProviders([
  jwtTokenInterceptor,
  authenticationAppInitializer,
  globalHttpErrorInterceptor,
]);
