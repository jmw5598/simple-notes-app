import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SnDocumentCreateComponent } from './components/document-create/document-create.component';
import { SnDocumentBuilderModule } from '../document-builder';
import { SnAlertModule } from '@sn/alert';
import { SnButtonsModule } from '@sn/button';
import { SnSectionHeaderModule } from '@sn/section-header';

@NgModule({
  declarations: [
    SnDocumentCreateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SnDocumentBuilderModule,
    SnAlertModule,
    SnButtonsModule,
    SnSectionHeaderModule,
  ],
  exports: [
    SnDocumentCreateComponent
  ]
})
export class SnDocumentCreateModule { }
