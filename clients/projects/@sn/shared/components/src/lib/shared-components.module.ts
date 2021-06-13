import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawerService } from './drawer/drawer.service';
import { DrawerComponent } from './drawer/drawer.component';
import { EmptyDataComponent } from './empty-data/empty-data.component';

import { FlashcardComponent } from './cards/flashcard/flashcard.component';
import { FlipcardBackComponent } from './cards/flipcard/flipcard-back.component';
import { FlipcardFrontComponent } from './cards/flipcard/flipcard-front.component';
import { FlipcardComponent } from './cards/flipcard/flipcard.component';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { OverlayContentComponent } from './overlay-content/overlay-content.component';
import { OverlayContentService } from './overlay-content/overlay-content.service';
import { OverlayLoaderComponent } from './overlay-loader/overlay-loader.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ToasterComponent } from './toaster/toaster.component';
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';
import { ToolbarButtonComponent } from './toolbar/toolbar-button/toolbar-button.component';
import { ToolbarButtonGroupComponent } from './toolbar/toolbar-button-group/toolbar-button-group.component';
import { ToolbarDockComponent } from './toolbar/toolbar-dock/toolbar-dock.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    DrawerComponent,
    EmptyDataComponent,
    FlashcardComponent,
    FlipcardBackComponent,
    FlipcardComponent,
    FlipcardFrontComponent,
    LoadingSpinnerComponent,
    OverlayContentComponent,
    OverlayLoaderComponent,
    PaginatorComponent,
    ToasterComponent,
    ToolbarComponent,
    ToolbarButtonComponent,
    ToolbarButtonGroupComponent,
    ToolbarDockComponent,
  ],
  imports: [
    CommonModule,
    TooltipModule
  ],
  exports: [
    DrawerComponent,
    EmptyDataComponent,
    FlashcardComponent,
    FlipcardBackComponent,
    FlipcardComponent,
    FlipcardFrontComponent,
    LoadingSpinnerComponent,
    OverlayContentComponent,
    OverlayLoaderComponent,
    PaginatorComponent,
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
