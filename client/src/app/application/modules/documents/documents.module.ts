import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown'
import { SharedModule } from '@sn/shared/shared.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentBuilderComponent } from './components/document-builder/document-builder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ViewDocumentsComponent } from './pages/view-documents/view-documents.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentUpdateComponent } from './components/document-update/document-update.component';
import { DocumentViewComponent } from './components/document-view/document-view.component';

@NgModule({
  declarations: [
    DocumentBuilderComponent,
    ViewDocumentsComponent,
    DocumentListComponent,
    DocumentUpdateComponent,
    DocumentViewComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    DocumentsRoutingModule,
    SharedModule,
    TypeaheadModule.forRoot(),
    ConfirmationPopoverModule,
    MarkdownModule.forRoot()
  ],
  entryComponents: [
    DocumentBuilderComponent,
    DocumentViewComponent
  ]
})
export class DocumentsModule { }
