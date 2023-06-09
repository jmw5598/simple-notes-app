import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MarkdownModule } from 'ngx-markdown';
import { ViewTopicsComponent } from './pages/view-topics/view-topics.component';
import { TopicsRoutingModule } from './topics-routing.module';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { TopicDetailsComponent } from './pages/topic-details/topic-details.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SectionListComponent } from './components/section-list/section-list.component';
import { TopicUpdateComponent } from './components/topic-update/topic-update.component';
import { TopicExportComponent } from './components/topic-export/topic-export.component';
import { SectionCreateComponent } from './components/section-create/section-create.component';
import { SectionUpdateComponent } from './components/section-update/section-update.component';
import { SectionFormComponent } from './components/section-form/section-form.component';
import { EditSectionNotesComponent } from './pages/edit-section-notes/edit-section-notes.component';

import { NgIconsModule } from '@ng-icons/core';
import { heroDocument, heroEye, heroClock, heroDocumentArrowDown, heroPencil, heroTrash } from '@ng-icons/heroicons/outline';

import * as fromTopics from './store/reducers';
import * as fromTopicsEffects from './store/effects';

import { SnButtonsModule } from '@sn/button';
import { SnAlertModule } from '@sn/alert';
import { SnEmptyModule } from '@sn/empty';
import { SnDrawerModule } from '@sn/drawer';
import { SnPaginatorModule } from '@sn/paginator';
import { SnDebounceSearchModule } from '@sn/debounce-search';
import { SnMarkdownModule } from '@sn/markdown';
import { SnTopicCreateModule } from '@sn/user/shared/modules/topic-create';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ViewTopicsComponent,
        TopicListComponent,
        TopicDetailsComponent,
        SectionListComponent,
        TopicUpdateComponent,
        TopicExportComponent,
        SectionCreateComponent,
        SectionUpdateComponent,
        SectionFormComponent,
        EditSectionNotesComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TopicsRoutingModule,
        ConfirmationPopoverModule.forRoot({
            popoverMessage: 'Are you sure?',
            cancelButtonType: 'btn-default btn-sm bg-secondary',
            confirmButtonType: 'btn-primary btn-sm bg-primary text-light'
        }),
        StoreModule.forFeature(fromTopics.topicsFeatureKey, fromTopics.topicReducer),
        StoreModule.forFeature(fromTopics.sectionsFeatureKey, fromTopics.sectionReducer),
        EffectsModule.forFeature([
            fromTopicsEffects.SectionsEffects,
            fromTopicsEffects.TopicsEffects
        ]),
        // AngularMarkdownEditorModule.forRoot({ iconlibrary: 'fa' }),
        MarkdownModule.forRoot(),
        NgIconsModule.withIcons({ 
            heroDocument, 
            heroEye, 
            heroClock, 
            heroDocumentArrowDown, 
            heroPencil, 
            heroTrash, 
        }),

        // Updated under here
        SnButtonsModule,
        SnAlertModule,
        SnEmptyModule,
        SnDrawerModule,
        SnPaginatorModule,
        SnDebounceSearchModule,
        SnMarkdownModule,
        SnTopicCreateModule,
    ]
})
export class TopicsModule { }
