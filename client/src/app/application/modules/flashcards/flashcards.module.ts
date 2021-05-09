import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@sn/shared/shared.module';
import { FlashcardsRoutingModule } from './flashcards-routing.module';
import { ViewFlashcardsComponent } from './pages/view-flashcards/view-flashcards.component';
import { FlashcardListComponent } from './components/flashcard-list/flashcard-list.component';

@NgModule({
  declarations: [
    ViewFlashcardsComponent,
    FlashcardListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlashcardsRoutingModule
  ]
})
export class FlashcardsModule { }
