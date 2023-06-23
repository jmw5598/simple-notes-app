import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { CoreServicesConfiguration, CoreServicesModule } from '@sn/core/services';

import { appRoutes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { provideCoreProviders } from './app/core/core.providers';
import { ROOT_REDUCERS, metaReducers, ROOT_EFFECTS, storeModuleRuntimeChecks } from './app/store/reducers';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const coreServicesConfiguration: CoreServicesConfiguration = {
  ...environment
}

bootstrapApplication(
  AppComponent, {
    providers: [
      provideRouter(appRoutes),
      provideHttpClient(withInterceptorsFromDi()),
      importProvidersFrom([
        BrowserAnimationsModule,
        CoreServicesModule.forRoot(coreServicesConfiguration), // @TODO this will be refactored eventually, replace with provideSnCoreProviders like below.
      ]),
      provideStore(ROOT_REDUCERS, { metaReducers, runtimeChecks: storeModuleRuntimeChecks }),
      provideEffects(ROOT_EFFECTS),
      provideStoreDevtools({ name: 'Simple Notes Project Store', logOnly: environment.production }),
      // provideVspCoreProviders(environment),
      provideCoreProviders(),
    ]
  }
).catch(error => console.log(error));