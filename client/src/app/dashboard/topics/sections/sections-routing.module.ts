import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionByIdGuard } from '@sn/core/guards';
import { CreateSectionComponent } from './pages/create-section/create-section.component';
import { EditSectionNotesComponent } from './pages/edit-section-notes/edit-section-notes.component';
import { UpdateSectionComponent } from './pages/update-section/update-section.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateSectionComponent
  },
  {
    path: ':sectionId',
    canActivate: [SectionByIdGuard],
    children: [
      {
        path: 'edit',
        component: UpdateSectionComponent
      },
      {
        path: 'editor',
        component: EditSectionNotesComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'create',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SectionsRoutingModule{ }
