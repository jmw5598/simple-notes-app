import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrawerService } from './drawer/drawer.service';
import { DrawerComponent } from './drawer/drawer.component';
import { EmptyDataComponent } from './empty-data/empty-data.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { OverlayLoaderComponent } from './overlay-loader/overlay-loader.component';
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';
import { ToolbarButtonComponent } from './toolbar/toolbar-button/toolbar-button.component';
import { ToolbarButtonGroupComponent } from './toolbar/toolbar-button-group/toolbar-button-group.component';
import { ToolbarDockComponent } from './toolbar/toolbar-dock/toolbar-dock.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    DrawerComponent,
    EmptyDataComponent,
    LoadingSpinnerComponent,
    OverlayLoaderComponent,
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
    LoadingSpinnerComponent,
    OverlayLoaderComponent,
    ToolbarComponent,
    ToolbarButtonComponent,
    ToolbarButtonGroupComponent,
    ToolbarDockComponent,
  ],
  providers: [
    DrawerService
  ]
})
export class SharedComponentsModule { }
