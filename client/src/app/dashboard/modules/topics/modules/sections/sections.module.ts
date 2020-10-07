import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'angular2-markdown';
import { SharedModule } from '@sn/shared/shared.module';
import { CreateSectionComponent } from './pages/create-section/create-section.component';
import { EditSectionNotesComponent } from './pages/edit-section-notes/edit-section-notes.component';
import { SectionsRoutingModule } from './sections-routing.module';
import { SectionFormComponent } from './components/section-form/section-form.component';
import { UpdateSectionComponent } from './pages/update-section/update-section.component';

@NgModule({
  declarations: [
    CreateSectionComponent,
    EditSectionNotesComponent,
    SectionFormComponent,
    UpdateSectionComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule,
    SharedModule,
    SectionsRoutingModule
  ]
})
export class SectionsModule { }
