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

@NgModule({
    declarations: [
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
    ]
})
export class DocumentsModule { }
