import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/shared/shared.module';
import { ViewTopicsComponent } from './pages/view-topics/view-topics.component';
import { TopicsRoutingModule } from './topics-routing.module';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { TopicDetailsComponent } from './pages/topic-details/topic-details.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SectionListComponent } from './components/section-list/section-list.component';
import { TopicUpdateComponent } from './components/topic-update/topic-update.component';
import { TopicExportComponent } from './components/topic-export/topic-export.component';

@NgModule({
  declarations: [
    ViewTopicsComponent, 
    TopicListComponent,
    TopicDetailsComponent,
    SectionListComponent,
    TopicUpdateComponent,
    TopicExportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TopicsRoutingModule,
    ConfirmationPopoverModule.forRoot({
      popoverMessage: 'Are you sure?',
      cancelButtonType: 'btn-default btn-sm bg-secondary',
      confirmButtonType: 'btn-primary btn-sm bg-primary text-light'
    })
  ],
  entryComponents: [
    TopicExportComponent,
    TopicUpdateComponent
  ]
})
export class TopicsModule { }
