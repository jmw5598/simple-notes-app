import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@sn/user/shared/shared.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FlashcardsRoutingModule } from './flashcards-routing.module';
import { ViewFlashcardsComponent } from './pages/view-flashcards/view-flashcards.component';
import { FlashcardListComponent } from './components/flashcard-list/flashcard-list.component';
import { FlashcardSetViewComponent } from './components/flashcard-set-view/flashcard-set-view.component';
import { FlashcardSetUpdateComponent } from './components/flashcard-set-update/flashcard-set-update.component';
import { MarkdownModule } from 'ngx-markdown';

import { NgIconsModule } from '@ng-icons/core';
import { 
    heroEye,
    heroTrash,
    heroPencil,
    heroClock,
    heroDocument, } from '@ng-icons/heroicons/outline';
    
import { SnButtonsModule } from '@sn/button';
import { SnAlertModule } from '@sn/alert';
import { SnEmptyModule } from '@sn/empty';
import { SnDrawerModule } from '@sn/drawer';
import { SnOverlayContentModule } from '@sn/overlay-content';
import { SnPaginatorModule } from '@sn/paginator';
import { SnDebounceSearchModule } from '@sn/debounce-search';

@NgModule({
    declarations: [
        ViewFlashcardsComponent,
        FlashcardListComponent,
        FlashcardSetViewComponent,
        FlashcardSetUpdateComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FlashcardsRoutingModule,
        ConfirmationPopoverModule,
        MarkdownModule.forRoot(),
        NgIconsModule.withIcons({
            heroEye,
            heroTrash,
            heroPencil,
            heroClock,
            heroDocument,
        }),
        SnButtonsModule,
        SnAlertModule,
        SnEmptyModule,
        SnDrawerModule,
        SnOverlayContentModule,
        SnPaginatorModule,
        SnDebounceSearchModule,
    ]
})
export class FlashcardsModule { }
