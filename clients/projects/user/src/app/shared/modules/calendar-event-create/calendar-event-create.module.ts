import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DpDatePickerModule } from 'ng2-date-picker';
import { ColorTwitterModule } from 'ngx-color/twitter';

import { SnAlertModule } from '@sn/alert';
import { SnButtonsModule } from '@sn/button';

import { SnCalendarEventCreateComponent } from './components/calendar-event-create/calendar-event-create.component';
import { SnCalendarEventFormComponent } from './components/calendar-event-form/calendar-event-form.component';
import { SnSectionHeaderModule } from '@sn/section-header';

@NgModule({
  declarations: [
    SnCalendarEventCreateComponent,
    SnCalendarEventFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SnAlertModule,
    SnButtonsModule,
    DpDatePickerModule,
    ColorTwitterModule,
    SnSectionHeaderModule,
  ],
  exports: [
    SnCalendarEventCreateComponent,
    SnCalendarEventFormComponent,
  ]
})
export class SnCalendarEventCreateModule { }
