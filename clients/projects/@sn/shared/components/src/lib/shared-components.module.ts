import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DebounceDirective } from './directives/debounce.directive';
import { DebouncedSearchComponent } from './components/debounced-search/debounced-search.component';
import { DrawerService } from './components/drawer/drawer.service';
import { DrawerComponent } from './components/drawer/drawer.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';

import { FlashcardComponent } from './components/cards/flashcard/flashcard.component';
import { FlipcardBackComponent } from './components/cards/flipcard/flipcard-back.component';
import { FlipcardFrontComponent } from './components/cards/flipcard/flipcard-front.component';
import { FlipcardComponent } from './components/cards/flipcard/flipcard.component';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { OverlayContentComponent } from './components/overlay-content/overlay-content.component';
import { OverlayContentService } from './components/overlay-content/overlay-content.service';
import { OverlayLoaderComponent } from './components/overlay-loader/overlay-loader.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ToolbarComponent } from './components/toolbar/toolbar/toolbar.component';
import { ToolbarButtonComponent } from './components/toolbar/toolbar-button/toolbar-button.component';
import { ToolbarButtonGroupComponent } from './components/toolbar/toolbar-button-group/toolbar-button-group.component';
import { ToolbarDockComponent } from './components/toolbar/toolbar-dock/toolbar-dock.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CheckboxComponent,
    DebounceDirective,
    DebouncedSearchComponent,
    DrawerComponent,
    EmptyDataComponent,
    FlashcardComponent,
    FlipcardBackComponent,
    FlipcardComponent,
    FlipcardFrontComponent,
    LoadingSpinnerComponent,
    OverlayContentComponent,
    OverlayLoaderComponent,
    PageHeaderComponent,
    PaginatorComponent,
    SpinnerComponent,
    TagInputComponent,
    ToasterComponent,
    ToolbarComponent,
    ToolbarButtonComponent,
    ToolbarButtonGroupComponent,
    ToolbarDockComponent,
  ],
  imports: [
    CommonModule,
    TooltipModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CheckboxComponent,
    DebounceDirective,
    DebouncedSearchComponent,
    DrawerComponent,
    EmptyDataComponent,
    FlashcardComponent,
    FlipcardBackComponent,
    FlipcardComponent,
    FlipcardFrontComponent,
    LoadingSpinnerComponent,
    OverlayContentComponent,
    OverlayLoaderComponent,
    PageHeaderComponent,
    PaginatorComponent,
    SpinnerComponent,
    TagInputComponent,
    ToasterComponent,
    ToolbarComponent,
    ToolbarButtonComponent,
    ToolbarButtonGroupComponent,
    ToolbarDockComponent,
  ],
  providers: [
    DrawerService,
    OverlayContentService
  ]
})
export class SharedComponentsModule { }
