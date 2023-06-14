import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgIconsModule } from '@ng-icons/core';
import { heroTrash, heroArrowsPointingOut } from '@ng-icons/heroicons/outline';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { SnAlertModule } from '@sn/alert';
import { SnEmptyModule } from '@sn/empty';

import { SnDocumentBuilderDocumentContainerComponent } from './components/document-builder-document-container/document-builder-document-container.component';
import { SnDocumentBuilderDocumentSectionComponent } from './components/document-builder-document-container/components/document-builder-document-section/document-builder-document-section.component';
import { SnDocumentBuilderDocumentTopicComponent } from './components/document-builder-document-container/components/document-builder-document-topic/document-builder-document-topic.component';
import { SnDocumentBuilderFormComponent } from './components/document-builder-form/document-builder-form.component';
import { SnDocumentBuilderSectionContainerComponent } from './components/document-builder-form/components/document-builder-section-container/document-builder-section-container.component';
import { SnDocumentBuilderTopicContainerComponent } from './components/document-builder-form/components/document-builder-topic-container/document-builder-topic-container.component';
import { SnFormModule } from '@sn/form';

@NgModule({
  declarations: [
    SnDocumentBuilderDocumentContainerComponent,
    SnDocumentBuilderDocumentSectionComponent,
    SnDocumentBuilderDocumentTopicComponent,
    SnDocumentBuilderFormComponent,
    SnDocumentBuilderSectionContainerComponent,
    SnDocumentBuilderTopicContainerComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgIconsModule.withIcons({
      heroTrash,
      heroArrowsPointingOut,
    }),
    ConfirmationPopoverModule,
    SnAlertModule,
    SnEmptyModule,
    SnFormModule,
  ],
  exports: [
    SnDocumentBuilderDocumentContainerComponent,
    SnDocumentBuilderDocumentSectionComponent,
    SnDocumentBuilderDocumentTopicComponent,
    SnDocumentBuilderFormComponent,
    SnDocumentBuilderSectionContainerComponent,
    SnDocumentBuilderTopicContainerComponent,
  ]
})
export class SnDocumentBuilderModule { }
