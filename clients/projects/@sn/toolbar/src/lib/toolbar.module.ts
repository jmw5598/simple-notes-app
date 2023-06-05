import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SnToolbarButtonGroupComponent } from './components/toolbar-button-group/toolbar-button-group.component';
import { SnToolbarButtonComponent } from './components/toolbar-button/toolbar-button.component';
import { SnToolbarDockComponent } from './components/toolbar-dock/toolbar-dock.component';
import { SnToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    SnToolbarButtonComponent,
    SnToolbarButtonGroupComponent,
    SnToolbarComponent,
    SnToolbarDockComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SnToolbarButtonComponent,
    SnToolbarButtonGroupComponent,
    SnToolbarComponent,
    SnToolbarDockComponent,
  ]
})
export class SnToolbarModule { }
