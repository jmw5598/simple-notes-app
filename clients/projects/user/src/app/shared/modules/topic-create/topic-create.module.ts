import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnTopicCreateComponent } from './components/topic-create/topic-create.component';
import { SnTopicFormComponent } from './components/topic-form/topic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SnTagInputModule } from '@sn/tag-input';
import { SnButtonsModule } from '@sn/button';
import { SnAlertModule } from '@sn/alert';

@NgModule({
  declarations: [
    SnTopicCreateComponent,
    SnTopicFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SnTagInputModule,
    SnButtonsModule,
    SnAlertModule,
  ],
  exports: [
    SnTopicCreateComponent,
    SnTopicFormComponent,
  ]
})
export class SnTopicCreateModule { }
