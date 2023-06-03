import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown'
import { SharedModule } from '@sn/user/shared/shared.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ViewDocumentsComponent } from './pages/view-documents/view-documents.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentUpdateComponent } from './components/document-update/document-update.component';
import { DocumentViewComponent } from './components/document-view/document-view.component';

import { SharedComponentsModule } from '@sn/shared/components';

import { NgIconsModule } from '@ng-icons/core';
import { 
    heroEye,
    heroTrash,
    heroPencil,
    heroClock,
    heroDocument, } from '@ng-icons/heroicons/outline';

import {
    bootstrapMarkdown,
    bootstrapFilePdf,
    bootstrapArrowCounterclockwise,
} from '@ng-icons/bootstrap-icons';

@NgModule({
    declarations: [
        ViewDocumentsComponent,
        DocumentListComponent,
        DocumentUpdateComponent,
        DocumentViewComponent,
    ],
    imports: [
        SharedComponentsModule,
        CommonModule,
        DragDropModule,
        DocumentsRoutingModule,
        SharedModule,
        ConfirmationPopoverModule,
        MarkdownModule.forRoot(),
        NgIconsModule.withIcons({
            heroEye,
            heroTrash,
            heroPencil,
            heroClock,
            heroDocument,
            bootstrapFilePdf,
            bootstrapMarkdown,
            bootstrapArrowCounterclockwise,
        }),
    ]
})
export class DocumentsModule { }
