import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SectionCreateComponent } from './sections/section-create/section-create.component';
import { SectionEditorComponent } from './sections/section-editor/section-editor.component';
import { TopicCreateComponent } from './topic-create/topic-create.component';
import { TopicDashboardComponent } from './topic-dashboard/topic-dashboard.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { TopicSearchComponent } from './topic-search/topic-search.component';

const TOPIC_ROUTES = [
  {
    path: '',
    component: TopicDashboardComponent
  },
  {
    path: 'create',
    component: TopicCreateComponent
  },
  {
    path: 'search',
    component: TopicSearchComponent
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        component: TopicDetailsComponent
      },
      {
        path: 'sections',
        children: [
          {
            path: 'create',
            component: SectionCreateComponent
          },
          {
            path: ':sectionId',
            component: SectionEditorComponent
          }
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(TOPIC_ROUTES)],
  exports: [RouterModule]
})
export class TopicsRoutingModule {}
