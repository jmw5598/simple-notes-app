import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTopicsComponent } from './pages/view-topics/view-topics.component';
import { SectionsSearchResultGuard, SectionByIdGuard, TopicByIdGuard, TopicsSearchResultGuard } from './guards';
import { TopicDetailsComponent } from './pages/topic-details/topic-details.component';
import { EditSectionNotesComponent } from './pages/edit-section-notes/edit-section-notes.component';

const routes: Routes = [
  {
    path: 'view',
    canActivate: [TopicsSearchResultGuard],
    component: ViewTopicsComponent
  },
  {
    path: ':topicId',
    canActivate: [TopicByIdGuard],
    children: [
      {
        path: 'details',
        canActivate: [SectionsSearchResultGuard],
        component: TopicDetailsComponent
      },
      {
        path: 'sections',
        children: [
          {
            path: ':sectionId',
            canActivate: [SectionByIdGuard],
            children: [
              {
                path: 'editor',
                component: EditSectionNotesComponent
              }
            ]
          }
        ] // End sections children
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'view',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TopicsRoutingModule{ }
