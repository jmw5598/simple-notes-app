import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconsModule } from '@ng-icons/core';
import { heroEye } from '@ng-icons/heroicons/outline';

import { SnDebounceSearchModule } from '@sn/debounce-search';
import { SnEmptyModule } from '@sn/empty';

import { SnTopicSearchComponent } from './components/topic-search/topic-search.component';
import { SnSectionHeaderModule } from '@sn/section-header';
import { SnFormModule } from '@sn/form';

@NgModule({
  declarations: [
    SnTopicSearchComponent,
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ heroEye }),
    SnDebounceSearchModule,
    SnEmptyModule,
    SnSectionHeaderModule,
    SnFormModule,
  ],
  exports: [
    SnTopicSearchComponent,
  ]
})
export class SnTopicSearchModule { }
