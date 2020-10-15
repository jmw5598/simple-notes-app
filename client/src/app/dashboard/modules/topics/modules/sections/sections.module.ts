import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'angular2-markdown';
import { SharedModule } from '@sn/shared/shared.module';
import { EditSectionNotesComponent } from './pages/edit-section-notes/edit-section-notes.component';
import { SectionsRoutingModule } from './sections-routing.module';
import { SectionFormComponent } from './components/section-form/section-form.component';

@NgModule({
  declarations: [
    EditSectionNotesComponent,
    SectionFormComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule,
    SharedModule,
    SectionsRoutingModule
  ]
})
export class SectionsModule { }
