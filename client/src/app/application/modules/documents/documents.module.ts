import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@sn/shared/shared.module';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentBuilderComponent } from './pages/document-builder/document-builder.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [
    DocumentBuilderComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    DocumentsRoutingModule,
    SharedModule,
    TypeaheadModule.forRoot()
  ]
})
export class DocumentsModule { }
