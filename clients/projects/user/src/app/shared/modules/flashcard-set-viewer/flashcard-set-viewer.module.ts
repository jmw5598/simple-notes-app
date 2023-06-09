import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';
import { NgIconsModule } from '@ng-icons/core';
import { heroChevronLeft, heroChevronRight, heroChevronDoubleLeft, heroChevronDoubleRight, heroArrowPath, heroQuestionMarkCircle } from '@ng-icons/heroicons/outline';

import { SnCardModule } from '@sn/card';
import { SnEmptyModule } from '@sn/empty';

import { SnFlashcardSetViewerComponent } from './components/flashcard-set-viewer/flashcard-set-viewer.component';
import { SnFlashcardSetViewerControlsComponent } from './components/flashcard-set-viewer/components/flashcard-set-viewer-controls/flashcard-set-viewer-controls.component';
import { SnFlashcardSetViewerControlsService } from './components/flashcard-set-viewer/services/flashcard-set-viewer-controls.service';
import { SnFlashcardSetViewerHeaderComponent } from './components/flashcard-set-viewer/components/flashcard-set-viewer-header/flashcard-set-viewer-header.component';
import { SnFlashcardSetViewerFlipperComponent } from './components/flashcard-set-viewer/components/flashcard-set-viewer-flipper/flashcard-set-viewer-flipper.component';

@NgModule({
  declarations: [
    SnFlashcardSetViewerComponent,
    SnFlashcardSetViewerControlsComponent,
    SnFlashcardSetViewerHeaderComponent,
    SnFlashcardSetViewerFlipperComponent,
  ],
  imports: [
    CommonModule,
    SnCardModule,
    SnEmptyModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE
    }),
    NgIconsModule.withIcons({
       heroChevronLeft,
      heroChevronRight,
      heroChevronDoubleLeft,
      heroChevronDoubleRight,
      heroArrowPath,
      heroQuestionMarkCircle,
    }),
  ],
  exports: [
    SnFlashcardSetViewerComponent,
    SnFlashcardSetViewerControlsComponent,
    SnFlashcardSetViewerHeaderComponent,
    SnFlashcardSetViewerFlipperComponent,
  ],
  providers: [
    SnFlashcardSetViewerControlsService,
  ]
})
export class SnFlashcardSetViewerModule { }
