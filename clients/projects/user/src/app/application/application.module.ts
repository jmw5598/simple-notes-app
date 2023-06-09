import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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

import { NgIconsModule } from '@ng-icons/core';

import { 
  heroBars4, 
  heroXMark, 
  heroClipboardDocumentList, 
  heroCog8Tooth, 
  heroLockOpen, 
  heroCalendarDays, 
  heroCreditCard, 
  heroDocument,
  heroRectangleGroup,
  heroBuildingLibrary,
  heroArrowSmallLeft,
  heroArrowSmallRight,
  heroBookOpen,
  heroMagnifyingGlass,
  heroEye,
  heroEyeSlash, } from '@ng-icons/heroicons/outline';
import { SnDrawerModule } from '@sn/drawer';
import { SnToolbarModule } from '@sn/toolbar';

import { SnDocumentCreateModule } from '../shared/modules/document-create';
import { SnFlashcardSetCreateModule } from '../shared/modules/flashcard-set-create';
import { SnCalendarEventCreateModule } from '../shared/modules/calendar-event-create';
import { SnTopicSearchModule } from '../shared/modules/topic-search';
import { SnTopicCreateModule } from '../shared/modules/topic-create';
import { SnTodoListCreateModule } from '../shared/modules/todo-list-create';

@NgModule({
  declarations: [
    ApplicationComponent,
    ToolbarComponent,
  ],
  imports: [
    CoreFramingModule,
    CommonModule,
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
    NgIconsModule.withIcons({
      heroBars4,
      heroXMark,
      heroClipboardDocumentList,
      heroCog8Tooth,
      heroLockOpen,
      heroCalendarDays,
      heroCreditCard,
      heroDocument,
      heroRectangleGroup,
      heroBuildingLibrary,
      heroArrowSmallLeft,
      heroArrowSmallRight,
      heroBookOpen,
      heroMagnifyingGlass,
      heroEye,
      heroEyeSlash,
    }),
    SnDrawerModule,
    SnToolbarModule,
    SnDocumentCreateModule,
    SnFlashcardSetCreateModule,
    SnCalendarEventCreateModule,
    SnTopicSearchModule,
    SnTopicCreateModule,
    SnTodoListCreateModule,
  ],
  providers: [
    {
      provide: Window,
      useValue: window
    }
  ]
})
export class ApplicationModule { }
