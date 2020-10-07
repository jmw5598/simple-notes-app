import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTopicsComponent } from './pages/create-topics/create-topics.component';
import { ViewTopicsComponent } from './pages/view-topics/view-topics.component';
import { SectionsSearchResultGuard, TopicByIdGuard, TopicsSearchResultGuard } from '@sn/core/guards';
import { TopicDetailsComponent } from './pages/topic-details/topic-details.component';
import { UpdateTopicComponent } from './pages/update-topic/update-topic.component';

const routes: Routes = [
  {
    path: 'view',
    canActivate: [TopicsSearchResultGuard],
    component: ViewTopicsComponent
  },
  {
    path: 'create',
    component: CreateTopicsComponent
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
        path: 'edit',
        component: UpdateTopicComponent
      },
      {
        path: 'sections',
        loadChildren: () => import('./modules/sections/sections.module').then(m => m.SectionsModule)
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
