import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/shared/shared.module';
import { ViewTopicsComponent } from './pages/view-topics/view-topics.component';
import { CreateTopicsComponent } from './pages/create-topics/create-topics.component';
import { TopicsRoutingModule } from './topics-routing.module';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { TopicDetailsComponent } from './pages/topic-details/topic-details.component';
import { TopicExportModalComponent } from './components/topic-export-modal/topic-export-modal.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SectionListComponent } from './components/section-list/section-list.component';

@NgModule({
  declarations: [
    ViewTopicsComponent, 
    CreateTopicsComponent,
    TopicListComponent,
    TopicDetailsComponent,
    TopicExportModalComponent,
    SectionListComponent
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
    TopicExportModalComponent
  ]
})
export class TopicsModule { }
