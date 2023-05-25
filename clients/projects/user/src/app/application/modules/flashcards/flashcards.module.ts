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

import { SharedComponentsModule } from '@sn/shared/components';

@NgModule({
    declarations: [
        ViewFlashcardsComponent,
        FlashcardListComponent,
        FlashcardSetViewComponent,
        FlashcardSetUpdateComponent
    ],
    imports: [
        SharedComponentsModule,
        CommonModule,
        SharedModule,
        FlashcardsRoutingModule,
        ConfirmationPopoverModule,
        MarkdownModule.forRoot()
    ]
})
export class FlashcardsModule { }
