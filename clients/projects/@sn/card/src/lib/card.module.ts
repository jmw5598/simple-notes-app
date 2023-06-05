import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnFlashcardComponent } from './components/flashcard/flashcard.component';
import { SnFlipcardComponent } from './components/flipcard/flipcard.component';
import { SnFlipcardBackComponent } from './components/flipcard/flipcard-back.component';
import { SnFlipcardFrontComponent } from './components/flipcard/flipcard-front.component';

@NgModule({
  declarations: [
    SnFlashcardComponent,
    SnFlipcardComponent,
    SnFlipcardBackComponent,
    SnFlipcardFrontComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SnFlashcardComponent,
    SnFlipcardComponent,
    SnFlipcardBackComponent,
    SnFlipcardFrontComponent,
  ]
})
export class SnCardModule { }
