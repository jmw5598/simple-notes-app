import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover'

import { DpDatePickerModule } from 'ng2-date-picker';

import { NgIconsModule } from "@ng-icons/core";
import { 
  heroEye, 
  heroEyeSlash, 
  heroCalendarDays, 
  heroArrowsPointingOut, 
  heroDocumentDuplicate, 
  heroTrash,
  heroChevronLeft,
  heroChevronRight,
  heroChevronDoubleLeft,
  heroChevronDoubleRight,
  heroArrowPath,
  heroQuestionMarkCircle } from '@ng-icons/heroicons/outline';

import { FlashcardSetCreateComponent } from './components';
import { TopicFormComponent } from './forms/topic-form/topic-form.component';
import { TopicCreateComponent } from './components/topic-create/topic-create.component';
import { TopicSearchComponent } from './components/topic-search/topic-search.component';
import { CalendarEventFormComponent } from './forms/calendar-event-form/calendar-event-form.component';
import { CalendarEventCreateComponent } from './components/calendar-event-create/calendar-event-create.component';

import { ColorTwitterModule } from 'ngx-color/twitter';
import { DocumentBuilderFormComponent } from './components/document-builder/components/document-builder-form/document-builder-form.component';
import { DocumentCreateComponent } from './components/document-create/document-create.component';

import { DocumentBuilderSectionContainerComponent } from './components/document-builder/components/document-builder-form/components/document-builder-section-container/document-builder-section-container.component';
import { DocumentBuilderTopicContainerComponent } from './components/document-builder/components/document-builder-form/components/document-builder-topic-container/document-builder-topic-container.component';
import { DocumentBuilderDocumentContainerComponent } from './components/document-builder/components/document-builder-document-container/document-builder-document-container.component';
import { DocumentBuilderDocumentTopicComponent } from './components/document-builder/components/document-builder-document-container/components/document-builder-document-topic/document-builder-document-topic.component';
import { DocumentBuilderDocumentSectionComponent } from './components/document-builder/components/document-builder-document-container/components/document-builder-document-section/document-builder-document-section.component';

import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { MarkdownModule } from 'ngx-markdown';
import { FlashcardSetBuilderFormComponent } from './components/flashcard-set-builder/components/flashcard-set-builder-form/flashcard-set-builder-form.component';
import { FlashcardSetComponent } from './components/flashcard-set-builder/components/flashcard-set-builder-container/components/flashcard-set/flashcard-set.component';
import { FlashcardSetBuilderContainerComponent } from './components/flashcard-set-builder/components/flashcard-set-builder-container/flashcard-set-builder-container.component';
import { FlashcardCreateFormComponent } from './components/flashcard-set-builder/components/flashcard-set-builder-form/components/flashcard-create-form/flashcard-create-form.component';
import { FlashcardEditFormComponent } from './components/flashcard-set-builder/components/flashcard-set-builder-form/components/flashcard-edit-form/flashcard-edit-form.component';
import { FlashcardSetViewerComponent } from './components/flashcard-set-viewer/flashcard-set-viewer.component';
import { FlashcardSetViewerControlsComponent } from './components/flashcard-set-viewer/components/flashcard-set-viewer-controls/flashcard-set-viewer-controls.component';
import { FlashcardSetViewerControlsService } from './components/flashcard-set-viewer/services/flashcard-set-viewer-controls.service';

import { FlashcardSetViewerHeaderComponent } from './components/flashcard-set-viewer/components/flashcard-set-viewer-header/flashcard-set-viewer-header.component';
import { FlashcardSetViewerFlipperComponent } from './components/flashcard-set-viewer/components/flashcard-set-viewer-flipper/flashcard-set-viewer-flipper.component';
import { TodoListCreateComponent } from './components/todo-list-create/todo-list-create.component';
import { TodoListFormComponent } from './forms/todo-list-form/todo-list-form.component';
import { TodoListDetailsComponent } from './components/todo-list-details/todo-list-details.component';
import { TodoListUpdateComponent } from './components/todo-list-update/todo-list-update.component';

import { TodoListProgressComponent } from './components/todo-list-progress/todo-list-progress.component';

import { SharedComponentsModule } from '@sn/shared/components';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    TopicFormComponent,
    TopicCreateComponent,
    TopicSearchComponent,
    CalendarEventFormComponent,
    CalendarEventCreateComponent,
    DocumentBuilderFormComponent,
    DocumentCreateComponent,
    DocumentBuilderSectionContainerComponent,
    DocumentBuilderTopicContainerComponent,
    DocumentBuilderDocumentContainerComponent,
    DocumentBuilderDocumentTopicComponent,
    DocumentBuilderDocumentSectionComponent,
    FlashcardSetCreateComponent,
    FlashcardSetBuilderFormComponent,
    FlashcardSetComponent,
    FlashcardSetBuilderContainerComponent,
    FlashcardCreateFormComponent,
    FlashcardEditFormComponent,
    FlashcardSetViewerComponent,
    FlashcardSetViewerControlsComponent,
    FlashcardSetViewerHeaderComponent,
    FlashcardSetViewerFlipperComponent,
    TodoListCreateComponent,
    TodoListFormComponent,
    TodoListDetailsComponent,
    TodoListUpdateComponent,
    TodoListProgressComponent
  ],
  imports: [
    SharedComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ColorTwitterModule,
    DragDropModule,
    ConfirmationPopoverModule,
    AngularMarkdownEditorModule.forRoot({ iconlibrary: 'fa' }),
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE
    }),
    NgIconsModule.withIcons({ 
      heroEye, 
      heroEyeSlash, 
      heroCalendarDays,
      heroArrowsPointingOut,
      heroDocumentDuplicate,
      heroTrash,
      heroChevronLeft,
      heroChevronRight,
      heroChevronDoubleLeft,
      heroChevronDoubleRight,
      heroArrowPath,
      heroQuestionMarkCircle,
    }),
    DpDatePickerModule,
    NgSelectModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TopicFormComponent,
    TopicCreateComponent,
    TopicSearchComponent,
    CalendarEventFormComponent,
    CalendarEventCreateComponent,
    DocumentBuilderFormComponent,
    DocumentCreateComponent,
    DocumentBuilderSectionContainerComponent,
    DocumentBuilderTopicContainerComponent,
    DocumentBuilderDocumentContainerComponent,
    FlashcardSetCreateComponent,    
    FlashcardSetViewerComponent,
    FlashcardSetBuilderFormComponent,
    TodoListCreateComponent,
    TodoListFormComponent,
    TodoListDetailsComponent,
    TodoListUpdateComponent,
    TodoListProgressComponent
  ],
  providers: [
    FlashcardSetViewerControlsService
  ]
})
export class SharedModule { }
