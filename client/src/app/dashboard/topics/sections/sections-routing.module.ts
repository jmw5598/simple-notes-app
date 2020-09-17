import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSectionComponent } from './pages/create-section/create-section.component';
import { EditSectionComponent } from './pages/edit-section/edit-section.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateSectionComponent
  },
  {
    path: ':sectionId',
    children: [
      {
        path: 'edit',
        component: EditSectionComponent
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
