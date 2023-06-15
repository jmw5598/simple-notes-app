import { NgModule } from '@angular/core';

import { SnListComponent } from './components/list/list.component';
import { SnListItemComponent } from './components/list-item/list-item.component';
import { SnListItemTitleComponent } from './components/list-item-title/list-item-title.component';
import { SnListItemSubtitleComponent } from './components/list-item-subtitle/list-item-subtitle.component';
import { SnListItemContentComponent } from './components/list-item-content/list-item-content.component';
import { SnListItemFooterComponent } from './components/list-item-footer/list-item-footer.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SnListComponent,
    SnListItemComponent,
    SnListItemTitleComponent,
    SnListItemSubtitleComponent,
    SnListItemContentComponent,
    SnListItemFooterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SnListComponent,
    SnListItemComponent,
    SnListItemTitleComponent,
    SnListItemSubtitleComponent,
    SnListItemContentComponent,
    SnListItemFooterComponent,
  ]
})
export class SnListModule { }
