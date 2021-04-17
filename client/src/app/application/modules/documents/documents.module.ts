import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@sn/shared/shared.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentBuilderComponent } from './components/document-builder/document-builder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ViewDocumentsComponent } from './pages/view-documents/view-documents.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentUpdateComponent } from './components/document-update/document-update.component';

@NgModule({
  declarations: [
    DocumentBuilderComponent,
    ViewDocumentsComponent,
    DocumentListComponent,
    DocumentUpdateComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    DocumentsRoutingModule,
    SharedModule,
    TypeaheadModule.forRoot(),
    ConfirmationPopoverModule
  ],
  entryComponents: [
    DocumentBuilderComponent
  ]
})
export class DocumentsModule { }
