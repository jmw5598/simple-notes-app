import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SharedModule } from '@sn/user/shared/shared.module';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { applicationReducer, applicationFeatureKey } from './store';
import { AccountsEffects } from './modules/accounts/store/effects';
import { CalendarEventsEffects, CalendarTodoListsEffects } from './modules/calendar/store/effects';
import { CalendarIntegrationsEffects } from './modules/accounts/modules/account-settings-integrations/store/effects';
import { DashboardEffects } from './modules/dashboard/store/effects/dashboard.effects';
import { DocumentsEffects } from './modules/documents/store/effects/documents.effects';
import { SectionsEffects } from './modules/topics/store/effects/sections.effects';
import { TopicsEffects } from './modules/topics/store/effects/topics.effects';
import { ToolbarEffects } from './store/effects/toolbar.effects';
import { FlashcardsEffects } from './modules/flashcards/store/effects/flashcards.effects';
import { TodoListsEffects } from './modules/todos/store/effects/todos.effects';

import { CoreFramingModule } from '@sn/core/framing';
import { SharedComponentsModule } from '@sn/shared/components';

@NgModule({
  declarations: [
    ApplicationComponent,
    ToolbarComponent
  ],
  imports: [
    CoreFramingModule,
    SharedComponentsModule,
    CommonModule,
    SharedModule,
    ApplicationRoutingModule,
    StoreModule.forFeature(applicationFeatureKey, applicationReducer),
    EffectsModule.forFeature([
      AccountsEffects,
      CalendarEventsEffects,
      CalendarIntegrationsEffects,
      CalendarTodoListsEffects,
      DashboardEffects,
      DocumentsEffects,
      SectionsEffects,
      TopicsEffects,
      ToolbarEffects,
      FlashcardsEffects,
      TodoListsEffects
    ]),
    KeyboardShortcutsModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [
    {
      provide: Window,
      useValue: window
    }
  ]
})
export class ApplicationModule { }
