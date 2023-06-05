import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnOverlayContentComponent } from './components/overlay-content/overlay-content.component';
import { SnOverlayContentService } from './components/overlay-content/overlay-content.service';

@NgModule({
  declarations: [
    SnOverlayContentComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SnOverlayContentComponent,
  ],
  providers: [
    SnOverlayContentService,
  ]
})
export class SnOverlayContentModule { }
