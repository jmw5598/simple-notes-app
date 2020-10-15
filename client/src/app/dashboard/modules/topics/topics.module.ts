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
import { SectionCreateComponent } from './components/section-create/section-create.component';
import { SectionUpdateComponent } from './components/section-update/section-update.component';
import { SectionFormComponent } from './components/section-form/section-form.component';

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
    SectionFormComponent
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
    TopicUpdateComponent,
    SectionCreateComponent,
    SectionUpdateComponent
  ]
})
export class TopicsModule { }
