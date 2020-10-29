import { NgModule, APP_INITIALIZER, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { resetStateOnLogout } from './store/reducers/global-meta.reducer';
import { authenticatedUserInitializer } from './initializers/authenticated-user.initializer';
import { AccountEffects } from './store/effects/account.effects';
import { accountReducer } from './store/reducers/account.reducer';
import { JwtTokenInterceptor } from './interceptors/jwt-token.interceptor';
import { HttpErrorEffects } from './store/effects/http-error.effects';
import { planReducer } from './store/reducers/plan.reducer';
import { PlanEffects } from './store/effects/plan.effects';
import { SectionEffects } from './store/effects/section.effects';
import { sectionReducer } from './store/reducers/section.reducer';
import { topicReducer } from './store/reducers/topic.reducer';
import { TopicEffects } from './store/effects/topic.effects';
import { AuthenticationService } from './services';
import { CalendarEventEffects } from './store/effects/calendar-event.effects';
import { calendarEventReducer } from './store/reducers/calendar-event.reducer';
import { CalendarIntegrationEffects } from './store/effects/calendar-integration.effects';
import { calendarIntegrationReducer } from './store/reducers/calendar-integration.reducer';

import * as fromAuthenticationState from '@sn/auth/store/state';
import { AuthenticationEffects } from '@sn/auth/store/effects';
import { authenticationReducer } from '@sn/auth/store/reducers';

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
    StoreModule.forRoot({
      accounts: accountReducer,
      [fromAuthenticationState.authenticationFeatureKey]: authenticationReducer,
      plans: planReducer,
      sections: sectionReducer,
      topics: topicReducer,
      calendarEvents: calendarEventReducer,
      calendarIntegrations: calendarIntegrationReducer
    }, { metaReducers: [resetStateOnLogout] }),

    EffectsModule.forRoot([
      AccountEffects,
      AuthenticationEffects,
      HttpErrorEffects,
      PlanEffects,
      SectionEffects,
      TopicEffects,
      CalendarEventEffects,
      CalendarIntegrationEffects
    ]),
    HttpClientModule,
  ],
  providers: [
    jwtTokenInterceptor,
    authenticationAppInitializer,
  ]
})
export class CoreModule { }
