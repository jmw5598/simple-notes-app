import { ModuleWithProviders, NgModule } from '@angular/core';
import { CoreServicesConfiguration, CORE_SERVICES_CONFIGURATION } from './core-services-configuration.model';

import { AccountsService } from './services/accounts.service';
import { AccountValidators } from './validators/account.validators';
import { AuthenticationService } from './services/authentication.service';
import { CalendarEventsService } from './services/calendar-events.service';
import { CalendarIntegrationsService } from './services/calendar-integrations.service';
import { DocumentsService } from './services/documents.service';
import { DynamicThemeService } from './services/dynamic-theme.service';
import { FlashcardsService } from './services/flashcards.service';
import { PlansService } from './services/plans.service';
import { ProfilesService } from './services/profiles.service';
import { SectionsService } from './services/sections.service';
import { SettingsService } from './services/settings.service';
import { ThemesService } from './services/themes.service';
import { TodoListsService } from './services/todo-lists.service';
import { TopicsService } from './services/topics.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class CoreServicesModule {
  public static forRoot(configuration: CoreServicesConfiguration): ModuleWithProviders<CoreServicesModule> {
    return {
      ngModule: CoreServicesModule,
      providers: [
        {
          provide: CORE_SERVICES_CONFIGURATION,
          useValue: configuration
        },
        AccountsService,
        AccountValidators,
        AuthenticationService,
        CalendarEventsService,
        CalendarIntegrationsService,
        DocumentsService,
        DynamicThemeService,
        FlashcardsService,
        PlansService,
        ProfilesService,
        SectionsService,
        SettingsService,
        ThemesService,
        TodoListsService,
        TopicsService
      ]
    }
  }
}
