import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTopicsComponent } from './pages/create-topics/create-topics.component';
import { ViewTopicsComponent } from './pages/view-topics/view-topics.component';
import { TopicByIdGuard, TopicsGuard } from '@sn/core/guards';
import { TopicDetailsComponent } from './pages/topic-details/topic-details.component';
const routes: Routes = [
  {
    path: 'view',
    canActivate: [TopicsGuard],
    component: ViewTopicsComponent
  },
  {
    path: 'create',
    component: CreateTopicsComponent
  },
  {
    path: ':topicId',
    children: [
      {
        path: 'details',
        canActivate: [TopicByIdGuard],
        component: TopicDetailsComponent
      },
      {
        path: 'sections',
        loadChildren: () => import('./sections/sections.module').then(m => m.SectionsModule)
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
