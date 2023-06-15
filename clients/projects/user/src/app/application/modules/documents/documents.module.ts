import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown'
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ViewDocumentsComponent } from './pages/view-documents/view-documents.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentUpdateComponent } from './components/document-update/document-update.component';
import { DocumentViewComponent } from './components/document-view/document-view.component';

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

import { SnButtonsModule } from '@sn/button';
import { SnEmptyModule } from '@sn/empty';
import { SnDrawerModule } from '@sn/drawer';
import { SnToolbarModule } from '@sn/toolbar';
import { SnPaginatorModule } from '@sn/paginator';
import { SnDebounceSearchModule } from '@sn/debounce-search';
import { SnLoadingSpinnerModule } from '@sn/loading-spinner';

import { SnDocumentBuilderModule } from '@sn/user/shared/modules/document-builder';
import { SnDocumentCreateModule } from '@sn/user/shared/modules/document-create';
import { ReactiveFormsModule } from '@angular/forms';
import { SnSectionHeaderModule } from '@sn/section-header';
import { SnListModule } from '@sn/list';
import { SnLinkModule } from '@sn/link';

@NgModule({
    declarations: [
        ViewDocumentsComponent,
        DocumentListComponent,
        DocumentUpdateComponent,
        DocumentViewComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DragDropModule,
        DocumentsRoutingModule,
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
        SnButtonsModule,
        SnEmptyModule,
        SnDrawerModule,
        SnToolbarModule,
        SnPaginatorModule,
        SnDebounceSearchModule,
        SnLoadingSpinnerModule,
        SnDocumentBuilderModule,
        SnDocumentCreateModule,
        SnSectionHeaderModule,
        SnListModule,
        SnLinkModule,
    ]
})
export class DocumentsModule { }
