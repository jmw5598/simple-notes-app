import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/shared/shared.module';
import { ViewTopicsComponent } from './pages/view-topics/view-topics.component';
import { CreateTopicsComponent } from './pages/create-topics/create-topics.component';
import { TopicsRoutingModule } from './topics-routing.module';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { TopicDetailsComponent } from './pages/topic-details/topic-details.component';

@NgModule({
  declarations: [
    ViewTopicsComponent, 
    CreateTopicsComponent,
    TopicListComponent,
    TopicDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TopicsRoutingModule
  ]
})
export class TopicsModule { }
