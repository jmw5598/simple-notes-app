import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SnAlertModule } from '@sn/alert';
import { SnButtonsModule } from '@sn/button';

import { SnFlashcardSetCreateComponent } from './components/flashcard-set-create/flashcard-set-create.component';
import { SnFlashcardSetBuilderModule } from '../flashcard-set-builder';

@NgModule({
  declarations: [
    SnFlashcardSetCreateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SnAlertModule,
    SnButtonsModule,
    SnFlashcardSetBuilderModule,
  ],
  exports: [
    SnFlashcardSetCreateComponent,
  ]
})
export class SnFlashcardSetCreateModule { }
