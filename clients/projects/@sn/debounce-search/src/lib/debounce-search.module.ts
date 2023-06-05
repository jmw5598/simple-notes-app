import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SnDebounceDirective } from './directives/debounce.directive';
import { SnDebouncedSearchComponent } from './components/debounced-search/debounced-search.component';

@NgModule({
  declarations: [
    SnDebouncedSearchComponent,
    SnDebounceDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    SnDebouncedSearchComponent,
    SnDebounceDirective
  ]
})
export class SnDebounceSearchModule { }
