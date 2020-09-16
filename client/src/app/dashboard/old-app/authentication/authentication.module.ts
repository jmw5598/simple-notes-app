import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthenticationService } from './services/authentication.service';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  imports: [JwtModule, HttpClientModule],
  exports: [],
  declarations: [],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    JwtModule
  ]
})
export class AuthenticationModule {}
