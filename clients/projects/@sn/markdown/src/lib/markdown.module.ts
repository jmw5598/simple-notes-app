import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SnMarkdownEasymdeDirective } from './directives/markdown-easymde.directive';

@NgModule({
  declarations: [
    SnMarkdownEasymdeDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    SnMarkdownEasymdeDirective,
  ]
})
export class SnMarkdownModule { }
