import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MarkdownModule } from 'ngx-markdown';
import { NgIconsModule } from '@ng-icons/core';
import { heroTrash, heroArrowsPointingOut, heroPencil } from '@ng-icons/heroicons/outline';

import { SnButtonsModule } from '@sn/button';
import { SnMarkdownModule } from '@sn/markdown';
import { SnEmptyModule } from '@sn/empty';
import { SnCardModule } from '@sn/card';

import { SnFlashcardSetBuilderContainerComponent } from './components/flashcard-set-builder-container/flashcard-set-builder-container.component';
import { SnFlashcardSetComponent} from './components/flashcard-set-builder-container/components/flashcard-set/flashcard-set.component';
import { SnFlashcardSetBuilderFormComponent } from './components/flashcard-set-builder-form/flashcard-set-builder-form.component';
import { SnFlashcardCreateFormComponent } from './components/flashcard-set-builder-form/components/flashcard-create-form/flashcard-create-form.component';
import { SnFlashcardEditFormComponent } from './components/flashcard-set-builder-form/components/flashcard-edit-form/flashcard-edit-form.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SnFormModule } from '@sn/form';

@NgModule({
  declarations: [
    SnFlashcardSetBuilderContainerComponent,
    SnFlashcardSetComponent,
    SnFlashcardSetBuilderFormComponent,
    SnFlashcardCreateFormComponent,
    SnFlashcardEditFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    ConfirmationPopoverModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE
    }),
    NgIconsModule.withIcons({
      heroTrash,
      heroArrowsPointingOut,
      heroPencil,
    }),
    SnButtonsModule,
    SnMarkdownModule,
    SnEmptyModule,
    SnCardModule,
    SnFormModule,
  ],
  exports: [
    SnFlashcardSetBuilderContainerComponent,
    SnFlashcardSetComponent,
    SnFlashcardSetBuilderFormComponent,
    SnFlashcardCreateFormComponent,
    SnFlashcardEditFormComponent,
  ]
})
export class SnFlashcardSetBuilderModule { }
