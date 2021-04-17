import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover'

import { SpinnerComponent } from './components/spinner/spinner.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DebouncedSearchComponent } from './components/debounced-search/debounced-search.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { DrawerService } from './components';
import { TopicFormComponent } from './forms/topic-form/topic-form.component';
import { TopicCreateComponent } from './components/topic-create/topic-create.component';
import { TopicSearchComponent } from './components/topic-search/topic-search.component';
import { CalendarEventFormComponent } from './forms/calendar-event-form/calendar-event-form.component';
import { CalendarEventCreateComponent } from './components/calendar-event-create/calendar-event-create.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DebounceDirective } from './directives/debounce.directive';

import { ColorTwitterModule } from 'ngx-color/twitter';
import { PageHeaderComponent } from './components/page-header/page-header.component'; // <color-twitter></color-twitter>
import { LayoutComponent } from './components/layout/layout.component';
import { DocumentBuilderFormComponent } from './components/document-builder/components/document-builder-form/document-builder-form.component';
import { DocumentCreateComponent } from './components/document-create/document-create.component';
import { OverlayLoaderComponent } from './components/overlay-loader/overlay-loader.component';
import { ToolbarComponent } from './components/toolbar/toolbar/toolbar.component';
import { ToolbarButtonComponent } from './components/toolbar/toolbar-button/toolbar-button.component';
import { ToolbarButtonGroupComponent } from './components/toolbar/toolbar-button-group/toolbar-button-group.component';
import { ToolbarDockComponent } from './components/toolbar/toolbar-dock/toolbar-dock.component';

import { DocumentBuilderSectionContainerComponent } from './components/document-builder/components/document-builder-form/components/document-builder-section-container/document-builder-section-container.component';
import { DocumentBuilderTopicContainerComponent } from './components/document-builder/components/document-builder-form/components/document-builder-topic-container/document-builder-topic-container.component';
import { DocumentBuilderDocumentContainerComponent } from './components/document-builder/components/document-builder-document-container/document-builder-document-container.component';
import { DocumentBuilderDocumentTopicComponent } from './components/document-builder/components/document-builder-document-container/components/document-builder-document-topic/document-builder-document-topic.component';
import { DocumentBuilderDocumentSectionComponent } from './components/document-builder/components/document-builder-document-container/components/document-builder-document-section/document-builder-document-section.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    TagInputComponent,
    LoadingSpinnerComponent,
    DebouncedSearchComponent,
    EmptyDataComponent,
    PaginatorComponent,
    DrawerComponent,
    TopicFormComponent,
    TopicCreateComponent,
    TopicSearchComponent,
    CalendarEventFormComponent,
    CalendarEventCreateComponent,
    DebounceDirective,
    PageHeaderComponent,
    LayoutComponent,
    DocumentBuilderFormComponent,
    DocumentCreateComponent,
    OverlayLoaderComponent,
    ToolbarComponent,
    ToolbarButtonComponent,
    ToolbarButtonGroupComponent,
    ToolbarDockComponent,
    DocumentBuilderSectionContainerComponent,
    DocumentBuilderTopicContainerComponent,
    DocumentBuilderDocumentContainerComponent,
    DocumentBuilderDocumentTopicComponent,
    DocumentBuilderDocumentSectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TimepickerModule,
    BsDatepickerModule.forRoot(),
    RouterModule,
    ColorTwitterModule,
    DragDropModule,
    TypeaheadModule,
    ConfirmationPopoverModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    TagInputComponent,
    LoadingSpinnerComponent,
    DebouncedSearchComponent,
    EmptyDataComponent,
    PaginatorComponent,
    DrawerComponent,
    TopicFormComponent,
    TopicCreateComponent,
    TopicSearchComponent,
    CalendarEventFormComponent,
    CalendarEventCreateComponent,
    DebounceDirective,
    PageHeaderComponent,
    LayoutComponent,
    DocumentBuilderFormComponent,
    DocumentCreateComponent,
    OverlayLoaderComponent,
    ToolbarComponent,
    ToolbarButtonComponent,
    ToolbarButtonGroupComponent,
    ToolbarDockComponent,
    DocumentBuilderSectionContainerComponent,
    DocumentBuilderTopicContainerComponent,
    DocumentBuilderDocumentContainerComponent,
  ],
  providers: [
    DrawerService
  ]
})
export class SharedModule { }
