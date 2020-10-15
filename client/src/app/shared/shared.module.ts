import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { DebouncedSearchComponent } from './components/debounced-search/debounced-search.component';
import { EmptyDataComponent } from './components/empty-data/empty-data.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { DrawerService } from './components';
import { TopicFormComponent } from './forms/topic-form/topic-form.component';
import { TopicCreateComponent } from './components/topic-create/topic-create.component';
import { TopicSearchComponent } from './components/topic-search/topic-search.component';
import { CalendarEventFormComponent } from './forms/calendar-event-form/calendar-event-form.component';
import { CalendarEventCreateComponent } from './components/calendar-event-create/calendar-event-create.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DebounceDirective } from './directives/debounce.directive';

@NgModule({
  declarations: [
    SpinnerComponent,
    TagInputComponent,
    LoadingSpinnerComponent,
    DebouncedSearchComponent,
    EmptyDataComponent,
    PaginatorComponent,
    DrawerComponent,
    TopicFormComponent,
    TopicCreateComponent,
    TopicSearchComponent,
    CalendarEventFormComponent,
    CalendarEventCreateComponent,
    DebounceDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TimepickerModule,
    BsDatepickerModule.forRoot(),
    RouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    TagInputComponent,
    LoadingSpinnerComponent,
    DebouncedSearchComponent,
    EmptyDataComponent,
    PaginatorComponent,
    DrawerComponent,
    TopicFormComponent,
    TopicCreateComponent,
    TopicSearchComponent,
    CalendarEventFormComponent,
    CalendarEventCreateComponent,
    DebounceDirective
  ],
  providers: [
    DrawerService
  ]
})
export class SharedModule { }
