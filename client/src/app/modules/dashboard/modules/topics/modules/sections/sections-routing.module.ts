import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionByIdGuard } from '@sn/core/guards';
import { EditSectionNotesComponent } from './pages/edit-section-notes/edit-section-notes.component';

const routes: Routes = [
  {
    path: ':sectionId',
    canActivate: [SectionByIdGuard],
    children: [
      {
        path: 'editor',
        component: EditSectionNotesComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '../topics',
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
