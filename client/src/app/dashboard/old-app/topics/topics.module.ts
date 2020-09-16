import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'angular2-markdown';
import { SharedModule } from '../shared/shared.module';

import { SectionCreateComponent } from './sections/section-create/section-create.component';
import { SectionEditorComponent } from './sections/section-editor/section-editor.component';

import { TopicsRoutingModule } from './topics.routing';

import { TopicDashboardComponent } from './topic-dashboard/topic-dashboard.component';
import { TopicCreateComponent } from './topic-create/topic-create.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { TopicExportComponent } from './topic-export/topic-export.component';
import { TopicSearchComponent } from './topic-search/topic-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarkdownModule.forRoot(),
    ReactiveFormsModule,
    SharedModule,
    TopicsRoutingModule
  ],
  exports: [
    TopicCreateComponent,
    TopicDashboardComponent,
    TopicDetailsComponent,
    TopicListComponent
  ],
  declarations: [
    SectionCreateComponent,
    SectionEditorComponent,
    TopicCreateComponent,
    TopicDashboardComponent,
    TopicDetailsComponent,
    TopicListComponent,
    TopicExportComponent,
    TopicSearchComponent
  ],
  providers: []
})
export class TopicsModule {}
